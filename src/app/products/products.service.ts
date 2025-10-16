import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { generateUID } from '../../utils/uid-generator';
import { CreateProductDto, UpdateProductDto } from './products.dto';
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

   async getProductsOfUser(userUid: string) {
    const user = await this.prisma.users.findUnique({
      where: { uid: userUid },
    });

    if (!user) {
      throw new NotFoundException(`User with UID ${userUid} not found`);
    }

    const products = await this.prisma.products.findMany({
      where: {
        createdById: user.id,
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

    async updateProduct(updateProductInput: UpdateProductDto) {
    const { productUid, userUid, categories, ...rest } = updateProductInput;

    const product = await this.prisma.products.findUnique({
      where: { uid: productUid },
      include: {
        createdByInfo: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with UID ${productUid} not found`);
    }

    const user = await this.prisma.users.findUnique({
      where: { uid: userUid },
    });
    if (!user) {
      throw new NotFoundException(`User with UID ${userUid} not found`);
    }
    if (product.createdById !== user.id) {
      throw new ForbiddenException('You are not authorized to update this product');
    }
    if (product.isBought) {
      throw new ForbiddenException('Cannot update a product that has been bought');
    }
    if (product.isRented) {
      throw new ForbiddenException('Cannot update a product that is currently rented');
    }

    const payload = {
      ...rest,
      ...(categories && categories.length > 0 && {
        productCategories: {
          deleteMany: {},
          create: categories.map((category) => ({
            category: category as any,
          })),
        },
      }),
    };

    const updatedProduct = await this.prisma.products.update({
      where: { uid: productUid },
      data: payload,
      include: {
        createdByInfo: true,
        productCategories: true,
      },
    });

    return {
      ...updatedProduct,
      categories: updatedProduct.productCategories.map((pc) => pc.category as Category),
    };
  }
}
