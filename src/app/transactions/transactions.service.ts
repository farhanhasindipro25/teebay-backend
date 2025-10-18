import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { BuyProductDto } from './transactions.dto';
import { generateUID } from 'src/utils/uid-generator';
import { Transaction } from './transactions.entity';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async buyProduct(buyProductInput: BuyProductDto) {
    const { productUid, buyerUid } = buyProductInput;

    const product = await this.prisma.products.findUnique({
      where: { uid: productUid },
      include: { createdByInfo: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with UID ${productUid} not found`);
    }

    if (product.isBought) {
      throw new BadRequestException('Product has already been bought');
    }

    const buyer = await this.prisma.users.findUnique({
      where: { uid: buyerUid },
    });

    if (!buyer) {
      throw new NotFoundException(`Buyer with UID ${buyerUid} not found`);
    }

    if (product.createdById === buyer.id) {
      throw new BadRequestException('You cannot buy your own product');
    }

    const transaction = await this.prisma.$transaction(async (trx) => {
      const boughtProduct = await trx.transactions.create({
        data: {
          uid: generateUID(),
          productId: product.id,
          buyerId: buyer.id,
          sellerId: product.createdById,
        },
        include: {
          productInfo: {
            include: {
              productCategories: true,
            },
          },
          buyerInfo: true,
          sellerInfo: true,
        },
      });

      await trx.products.update({
        where: { id: product.id },
        data: { isBought: true },
      });

      return boughtProduct;
    });

    const productDetails = {
      ...transaction,
      productInfo: {
        ...transaction.productInfo,
        categories: transaction.productInfo.productCategories.map(
          (pc) => pc.category,
        ),
      },
    };

    return {
      success: true,
      message: 'Product purchased successfully',
      transaction: productDetails as Transaction,
    };
  }
}
