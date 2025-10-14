import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductDto } from './products.dto';
import { Product } from './products.entity';

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

  @Mutation(() => Product, { name: 'createProduct' })
  async create(
    @Args('createProductInput') createProductInput: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductInput);
  }
}
