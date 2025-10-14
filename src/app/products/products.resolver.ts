import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductDto } from './products.dto';
import { Product } from './products.entity';


@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product, { name: 'createProduct' })
  async create(
    @Args('createProductInput') createProductInput: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.createProduct(createProductInput);
  }
}
