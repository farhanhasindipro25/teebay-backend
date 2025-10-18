import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType('LoginInput')
export class LoginDto {
  @Field(() => String)
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
