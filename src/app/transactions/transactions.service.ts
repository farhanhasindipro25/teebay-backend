import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { BuyProductDto, RentProductDto } from './transactions.dto';
import { Transaction, TransactionType } from './transactions.entity';
import { generateUID } from '../../utils/uid-generator';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async buyProduct(buyProductInput: BuyProductDto) {
    try {
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
              include: { productCategories: true },
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
    } catch (error) {
      console.error('buyProduct error:', error);
      throw new InternalServerErrorException({
        success: false,
        message: 'An error occurred while buying the product.',
        context: 'TransactionsService - buyProduct',
      });
    }
  }

  async rentProduct(rentProductInput: RentProductDto) {
    const { productUid, renterUid, rentStartsAt, rentEndsAt } =
      rentProductInput;

    try {
      const product = await this.prisma.products.findUnique({
        where: { uid: productUid },
        include: { createdByInfo: true },
      });

      if (!product) {
        throw new NotFoundException({
          success: false,
          message: `Product with UID ${productUid} not found`,
          context: 'TransactionsService - rentProduct',
        });
      }

      if (product.isBought) {
        throw new ForbiddenException({
          success: false,
          message: 'Product has already been bought and cannot be rented',
          context: 'TransactionsService - rentProduct',
        });
      }

      if (product.isRented) {
        throw new ForbiddenException({
          success: false,
          message: 'Product is already rented',
          context: 'TransactionsService - rentProduct',
        });
      }

      const renter = await this.prisma.users.findUnique({
        where: { uid: renterUid },
      });

      if (!renter) {
        throw new NotFoundException({
          success: false,
          message: `Renter with UID ${renterUid} not found`,
          context: 'TransactionsService - rentProduct',
        });
      }

      const startDate = new Date(rentStartsAt);
      const endDate = new Date(rentEndsAt);
      if (startDate < new Date()) {
        throw new ForbiddenException({
          success: false,
          message: 'Rental start date cannot be in the past',
          context: 'TransactionsService - rentProduct',
        });
      }
      if (endDate <= startDate) {
        throw new ForbiddenException({
          success: false,
          message: 'Rental end date must be after start date',
          context: 'TransactionsService - rentProduct',
        });
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
            productInfo: { include: { productCategories: true } },
            buyerInfo: true,
            sellerInfo: true,
          },
        });

        const updatedProduct = await trx.products.update({
          where: { id: product.id },
          data: {
            isRented: true,
            rentStartsAt,
            rentEndsAt,
          },
          include: { productCategories: true },
        });

        rentedProduct.productInfo = updatedProduct as any;

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
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof ForbiddenException
      )
        throw error;

      throw new InternalServerErrorException({
        success: false,
        message: 'An error occurred while processing the rental.',
        context: 'TransactionsService - rentProduct',
        error: error.message,
      });
    }
  }

  async getUserTransactions(userUid: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { uid: userUid },
      });

      if (!user) {
        throw new NotFoundException(`User with UID ${userUid} not found`);
      }

      const bought = await this.prisma.transactions.findMany({
        where: {
          buyerId: user.id,
          type: TransactionType.SALE,
          isActive: true,
        },
        include: {
          productInfo: { include: { productCategories: true } },
          buyerInfo: true,
          sellerInfo: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      const sold = await this.prisma.transactions.findMany({
        where: {
          sellerId: user.id,
          type: TransactionType.SALE,
          isActive: true,
        },
        include: {
          productInfo: { include: { productCategories: true } },
          buyerInfo: true,
          sellerInfo: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      const borrowed = await this.prisma.transactions.findMany({
        where: {
          buyerId: user.id,
          type: TransactionType.RENTAL,
          isActive: true,
        },
        include: {
          productInfo: { include: { productCategories: true } },
          buyerInfo: true,
          sellerInfo: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      const lent = await this.prisma.transactions.findMany({
        where: {
          sellerId: user.id,
          type: TransactionType.RENTAL,
          isActive: true,
        },
        include: {
          productInfo: { include: { productCategories: true } },
          buyerInfo: true,
          sellerInfo: true,
        },
        orderBy: { createdAt: 'desc' },
      });

      const processTransactions = (transactions: any[]) =>
        transactions.map((transaction) => ({
          ...transaction,
          productInfo: {
            ...transaction.productInfo,
            categories: transaction.productInfo.productCategories.map(
              (pc) => pc.category,
            ),
          },
        }));

      return {
        success: true,
        message: 'User transactions retrieved successfully',
        transactions: {
          bought: processTransactions(bought) as Transaction[],
          sold: processTransactions(sold) as Transaction[],
          borrowed: processTransactions(borrowed) as Transaction[],
          lent: processTransactions(lent) as Transaction[],
        },
      };
    } catch (error) {
      console.error('getUserTransactions error:', error);
      throw new InternalServerErrorException({
        success: false,
        message: 'An error occurred while retrieving user transactions.',
        context: 'TransactionsService - getUserTransactions',
      });
    }
  }
}
