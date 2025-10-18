import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Module({
  providers: [TransactionsService, TransactionsResolver, PrismaService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
