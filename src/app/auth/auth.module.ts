import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from '../../shared/prisma/prisma.service';

@Module({
  providers: [AuthService, AuthResolver, PrismaService],
  exports: [AuthService],
})
export class AuthModule {}
