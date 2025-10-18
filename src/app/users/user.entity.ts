import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../products/products.entity';

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  uid: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => String, { nullable: true })
  phone: string | null;

  @Field(() => String, { nullable: true })
  address: string | null;

  @Field()
  password: string;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => [Product], { nullable: true })
  products?: Product[];
}

@ObjectType()
export class UsersResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => [User])
  data: User[];
}

@ObjectType()
export class UserResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => User)
  data: User;
}
