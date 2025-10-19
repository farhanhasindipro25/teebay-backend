import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUser {
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
}

@ObjectType()
export class LoginResponse {
  @Field()
  success: boolean;

  @Field()
  message: string;

  @Field(() => AuthUser, { nullable: true })
  user?: AuthUser;
}

@ObjectType()
export class LogoutResponse {
  @Field(() => Boolean)
  success: boolean;

  @Field(() => String)
  message: string;
}
