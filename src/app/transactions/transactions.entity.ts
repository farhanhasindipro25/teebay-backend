import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../products/products.entity';
import { User } from '../users/user.entity';

@ObjectType()
export class Transaction {
  @Field(() => Int)
  id: number;

  @Field()
  uid: string;

  @Field(() => Int)
  productId: number;

  @Field(() => Product)
  productInfo: Product;

  @Field(() => Int)
  buyerId: number;

  @Field(() => User)
  buyerInfo: User;

  @Field(() => Int)
  sellerId: number;

  @Field(() => User)
  sellerInfo: User;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

@ObjectType()
export class BuyProductResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => Transaction, { nullable: true })
  transaction?: Transaction;
}
