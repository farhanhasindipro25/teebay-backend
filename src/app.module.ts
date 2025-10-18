import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './shared/prisma/prisma.module';
import { GraphqlModule } from './shared/graphql/graphql.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { ProductsModule } from './app/products/products.module';
import { TransactionsModule } from './app/transactions/transaction.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './configs/.env.development',
    }),
    PrismaModule,
    GraphqlModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
