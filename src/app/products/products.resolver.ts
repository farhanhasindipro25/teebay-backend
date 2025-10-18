import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import {
  DeleteProductResponse,
  Product,
  ProductResponse,
  ProductsResponse,
} from './products.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => ProductsResponse, { name: 'products' })
  async findAll(): Promise<ProductsResponse> {
    return this.productsService.getAllProducts();
  }

  @Query(() => ProductResponse, { name: 'product' })
  async findOne(@Args('uid') uid: string): Promise<ProductResponse> {
    return this.productsService.getProductByUid(uid);
  }

  @Query(() => ProductsResponse, { name: 'productsByUser' })
  async findByUser(
    @Args('userUid') userUid: string,
  ): Promise<ProductsResponse> {
    return this.productsService.getProductsOfUser(userUid);
  }

  @Mutation(() => ProductResponse, { name: 'createProduct' })
  async create(
    @Args('createProductInput') createProductInput: CreateProductDto,
  ): Promise<ProductResponse> {
    return this.productsService.createProduct(createProductInput);
  }

  @Mutation(() => ProductResponse, { name: 'updateProduct' })
  async update(
    @Args('updateProductInput') updateProductInput: UpdateProductDto,
  ): Promise<ProductResponse> {
    return this.productsService.updateProduct(updateProductInput);
  }

  @Mutation(() => DeleteProductResponse, { name: 'deleteProduct' })
  async delete(
    @Args('productUid') productUid: string,
    @Args('userUid') userUid: string,
  ): Promise<DeleteProductResponse> {
    return this.productsService.deleteProduct(productUid, userUid);
  }
}
