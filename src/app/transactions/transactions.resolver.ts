import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BuyProductDto, RentProductDto } from './transactions.dto';
import { TransactionsService } from './transactions.service';
import { BuyProductResponse, RentProductResponse } from './transactions.entity';

@Resolver()
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Mutation(() => BuyProductResponse, { name: 'buyProduct' })
  async buyProduct(
    @Args('buyProductInput') buyProductInput: BuyProductDto,
  ): Promise<BuyProductResponse> {
    return this.transactionsService.buyProduct(buyProductInput);
  }

  @Mutation(() => RentProductResponse)
  async rentProduct(
    @Args('rentProductInput') rentProductInput: RentProductDto,
  ): Promise<RentProductResponse> {
    return this.transactionsService.rentProduct(rentProductInput);
  }
}
