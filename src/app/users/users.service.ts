import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { generateUID } from '../../utils/uid-generator';
import { CreateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserInput: CreateUserDto) {
    try {
      const { email, ...rest } = createUserInput;

      const existingUser = await this.prisma.users.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new BadRequestException({
          success: false,
          message: 'An account with this email already exists!',
        });
      }

      const user = await this.prisma.users.create({
        data: {
          ...rest,
          uid: generateUID(),
          email,
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
