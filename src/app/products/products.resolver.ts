import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './products.dto';
import { DeleteProductResponse, Product } from './products.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Query(() => [Product], { name: 'products' })
  async findAll(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Query(() => Product, { name: 'product' })
  async findOne(@Args('uid') uid: string): Promise<Product> {
    return this.productsService.getProductByUid(uid);
  }

  @Query(() => [Product], { name: 'productsByUser' })
  async findByUser(@Args('userUid') userUid: string): Promise<Product[]> {
    return this.productsService.getProductsOfUser(userUid);
  }

  @Mutation(() => Product, { name: 'createProduct' })
  async create(
    @Args('createProductInput') createProductInput: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductInput);
  }

  @Mutation(() => Product, { name: 'updateProduct' })
  async update(
    @Args('updateProductInput') updateProductInput: UpdateProductDto,
  ): Promise<Product> {
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
