import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { generateUID } from '../../utils/uid-generator';
import { CreateProductDto } from './products.dto';
import { Category } from './products.entity';


@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProduct(createProductInput: CreateProductDto) {
    const { userUid, categories, ...payload } = createProductInput;

    const user = await this.prisma.users.findUnique({
      where: { uid: userUid },
    });

    if (!user) {
      throw new NotFoundException(`User with UID ${userUid} not found`);
    }

    const product = await this.prisma.products.create({
      data: {
        ...payload,
        uid: generateUID(),
        createdById: user.id,
        description: payload.description || null,
        rentalPrice: payload.rentalPrice || null,
        rentalType: payload.rentalType || null,
        rentStartsAt: payload.rentStartsAt || null,
        rentEndsAt: payload.rentEndsAt || null,
        productCategories: {
          create: categories.map((category) => ({
            category: category as any,
          })),
        },
      },
      include: {
        createdByInfo: true,
        productCategories: true,
      },
    });


    return {
      ...product,
      categories: product.productCategories.map((pc) => pc.category as Category),
    };
  }

 async getAllProducts() {
    const products = await this.prisma.products.findMany({
      where: {
        isActive: true,
      },
      include: {
        createdByInfo: true,
        productCategories: true,
      },
    });

    return products.map((product) => ({
      ...product,
      categories: product.productCategories.map((pc) => pc.category as Category),
    }));
  }

  async getProductByUid(uid: string) {
    const product = await this.prisma.products.findUnique({
      where: { uid },
      include: {
        createdByInfo: true,
        productCategories: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with UID ${uid} not found`);
    }

    return {
      ...product,
      categories: product.productCategories.map((pc) => pc.category as Category),
    };
  }
}
