import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './shared/prisma/prisma.module';
import { GraphqlModule } from './shared/graphql/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    PrismaModule,
    GraphqlModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
