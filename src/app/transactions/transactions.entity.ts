import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Product } from '../products/products.entity';
import { User } from '../users/user.entity';

export enum TransactionType {
  SALE = 'SALE',
  RENTAL = 'RENTAL',
}

registerEnumType(TransactionType, {
  name: 'TransactionType',
  description: 'The type of transaction',
});

@ObjectType()
export class Transaction {
  @Field(() => Int)
  id: number;

  @Field()
  uid: string;

  @Field(() => TransactionType)
  type: TransactionType;

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

@ObjectType()
export class RentProductResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => Transaction, { nullable: true })
  transaction?: Transaction;
}

@ObjectType()
export class UserTransactions {
  @Field(() => [Transaction])
  bought: Transaction[];

  @Field(() => [Transaction])
  sold: Transaction[];

  @Field(() => [Transaction])
  borrowed: Transaction[];

  @Field(() => [Transaction])
  lent: Transaction[];
}

@ObjectType()
export class UserTransactionsResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => UserTransactions, { nullable: true })
  transactions?: UserTransactions;
}
