import { ObjectType, Field, Int, Float, registerEnumType } from '@nestjs/graphql';
import { User } from '../users/user.entity';

export enum Category {
  ELECTRONICS = 'ELECTRONICS',
  FURNITURE = 'FURNITURE',
  HOME_APPLIANCES = 'HOME_APPLIANCES',
  SPORTING_GOODS = 'SPORTING_GOODS',
  OUTDOOR = 'OUTDOOR',
  TOYS = 'TOYS',
}

registerEnumType(Category, {
  name: 'Category',
});


@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  uid: string;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description: string | null;

  @Field(() => Float)
  price: number;

  @Field(() => Float, { nullable: true })
  rentalPrice: number | null;

  @Field(() => String, { nullable: true })
  rentalType: string | null;

  @Field(() => String, { nullable: true })
  rentStartsAt: string | null;

  @Field(() => String, { nullable: true })
  rentEndsAt: string | null;

  @Field()
  isBought: boolean;

  @Field()
  isRented: boolean;

  @Field(() => Int)
  createdById: number;

  @Field(() => User, { nullable: true })
  createdByInfo?: User;

  @Field(() => [Category])
  categories: Category[];

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
