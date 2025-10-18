import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { generateUID } from '../../utils/uid-generator';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserInput: CreateUserDto) {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'An error occurred while creating a user.',
        context: 'UsersService - createUser',
        error: error.message,
      });
    }
  }

  async getUsers() {
    try {
      return await this.prisma.users.findMany({
        where: {
          isActive: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException({
        success: false,
        message: 'An error occurred while retrieving users.',
        context: 'UsersService - getUsers',
        error: error.message,
      });
    }
  }

  async getUserByUid(uid: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          uid,
        },
      });

      if (!user) {
        throw new NotFoundException({
          success: false,
          message: `User with UID ${uid} not found`,
          context: 'UsersService - getUserByUid',
        });
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        success: false,
        message: 'An error occurred while retrieving user by UID.',
        context: 'UsersService - getUserByUid',
        error: error.message,
      });
    }
  }
}
