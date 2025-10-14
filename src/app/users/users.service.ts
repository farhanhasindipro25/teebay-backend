import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { generateUID } from '../../utils/uid-generator';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserInput: CreateUserDto) {
    const { password, ...rest } = createUserInput;
    
    const user = await this.prisma.users.create({
      data: {
        ...rest,
        uid: generateUID(),
        password,
        phone: rest.phone || null,
        address: rest.address || null,
      },
    });

    return user;
  }

  async getUsers() {
    return this.prisma.users.findMany({
      where: {
        isActive: true
      }
    });
  }

   async getUserByUid(uid: string) {
    const user = await this.prisma.users.findUnique({
      where: {
        uid,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with UID ${uid} not found`);
    }

    return user;
  }
}
