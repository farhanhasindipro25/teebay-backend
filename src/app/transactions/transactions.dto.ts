import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty } from 'class-validator';

@InputType('BuyProductInput')
export class BuyProductDto {
  @Field(() => String)
  @IsNotEmpty({ message: 'Product UID is required' })
  productUid: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Buyer UID is required' })
  buyerUid: string;
}

@InputType('RentProductInput')
export class RentProductDto {
  @Field(() => String)
  @IsNotEmpty({ message: 'Product UID is required' })
  productUid: string;

  @Field(() => String)
  @IsNotEmpty({ message: 'Renter UID is required' })
  renterUid: string;

  @Field(() => String)
  @IsDateString({}, { message: 'rentStartsAt must be a valid ISO date string' })
  rentStartsAt: string;

  @Field(() => String)
  @IsDateString({}, { message: 'rentEndsAt must be a valid ISO date string' })
  rentEndsAt: string;
}
