import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './shared/prisma/prisma.module';
import { GraphqlModule } from './shared/graphql/graphql.module';
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: './configs/.env.development'
    }), 
    PrismaModule,
    GraphqlModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
