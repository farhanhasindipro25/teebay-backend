import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType('BuyProductInput')
export class BuyProductDto {
  @Field(() => String)
  @IsNotEmpty({ message: 'Product UID is required' })
  productUid: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Buyer UID is required' })
  buyerUid: string;
}

