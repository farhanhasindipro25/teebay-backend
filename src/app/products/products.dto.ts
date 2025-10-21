import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  ArrayMinSize,
  Min,
} from 'class-validator';
import { Category } from './products.entity';

@InputType('CreateProductInput')
export class CreateProductDto {
  @Field(() => String)
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => Float)
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be positive' })
  price: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Rental price must be a number' })
  @Min(0, { message: 'Rental price must be positive' })
  rentalPrice?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  rentalType?: string;

  @Field(() => [Category])
  @IsArray({ message: 'Categories must be an array' })
  @ArrayMinSize(1, { message: 'At least one category is required' })
  categories: Category[];

  @Field(() => String)
  @IsNotEmpty({ message: 'User UID is required' })
  userUid: string;
}

@InputType('UpdateProductInput')
export class UpdateProductDto {
  @Field(() => String)
  @IsNotEmpty({ message: 'Product UID is required' })
  productUid: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  title?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Price must be a number' })
  @Min(0, { message: 'Price must be positive' })
  price?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber({}, { message: 'Rental price must be a number' })
  @Min(0, { message: 'Rental price must be positive' })
  rentalPrice?: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  rentalType?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  rentStartsAt?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  rentEndsAt?: string;

  @Field(() => [Category], { nullable: true })
  @IsOptional()
  @IsArray({ message: 'Categories must be an array' })
  @ArrayMinSize(1, { message: 'At least one category is required' })
  categories?: Category[];

  @Field(() => String)
  @IsNotEmpty({ message: 'User UID is required' })
  userUid: string;
}
