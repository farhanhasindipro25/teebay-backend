import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { generateUID } from 'src/utils/uid-generator';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { BuyProductDto, RentProductDto } from './transactions.dto';
import { Transaction, TransactionType } from './transactions.entity';

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

    if (!product.isActive) {
      throw new BadRequestException('Product is not active');
    }

    if (product.isRented) {
      throw new BadRequestException(
        'Product has already been rented and cannot be bought',
      );
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

    if (!buyer.isActive) {
      throw new BadRequestException('Buyer account is not active');
    }

    if (product.createdById === buyer.id) {
      throw new BadRequestException('You cannot buy your own product');
    }

    const transaction = await this.prisma.$transaction(async (trx) => {
      const boughtProduct = await trx.transactions.create({
        data: {
          uid: generateUID(),
          type: TransactionType.SALE,
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

  async rentProduct(rentProductInput: RentProductDto) {
    const { productUid, renterUid } = rentProductInput;

    const product = await this.prisma.products.findUnique({
      where: { uid: productUid },
      include: { createdByInfo: true },
    });

    if (!product) {
      throw new NotFoundException(`Product with UID ${productUid} not found`);
    }

    if (product.isBought) {
      throw new BadRequestException(
        'Product has already been bought and cannot be rented',
      );
    }

    if (product.isRented) {
      throw new BadRequestException('Product is already rented');
    }

    if (!product.rentalPrice) {
      throw new BadRequestException('This product is not available for rent');
    }

    const renter = await this.prisma.users.findUnique({
      where: { uid: renterUid },
    });

    if (!renter) {
      throw new NotFoundException(`Renter with UID ${renterUid} not found`);
    }

    if (!renter.isActive) {
      throw new BadRequestException('Renter account is not active');
    }

    if (product.createdById === renter.id) {
      throw new BadRequestException('You cannot rent your own product');
    }

    if (product.rentStartsAt && product.rentEndsAt) {
      const startDate = new Date(product.rentStartsAt);
      const endDate = new Date(product.rentEndsAt);
      const today = new Date();

      if (startDate < today) {
        throw new BadRequestException(
          'Rental start date cannot be in the past',
        );
      }

      if (endDate <= startDate) {
        throw new BadRequestException(
          'Rental end date must be after start date',
        );
      }
    }

    const transaction = await this.prisma.$transaction(async (trx) => {
      const rentedProduct = await trx.transactions.create({
        data: {
          uid: generateUID(),
          type: TransactionType.RENTAL,
          productId: product.id,
          buyerId: renter.id,
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
        data: { isRented: true },
      });

      return rentedProduct;
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
      message: 'Product rented successfully',
      transaction: productDetails as Transaction,
    };
  }
}
