import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(loginInput: LoginDto) {
    try {
      const { email, password } = loginInput;

      const user = await this.prisma.users.findUnique({
        where: { email },
      });

      if (!user) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      if (!user.isActive) {
        return {
          success: false,
          message: 'Account is not active',
        };
      }

      if (user.password !== password) {
        return {
          success: false,
          message: 'Invalid email or password',
        };
      }

      return {
        success: true,
        message: 'Login successful',
        user: {
          uid: user.uid,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
      };
    } catch (error) {
      console.error('Login error:', error);
      throw new InternalServerErrorException({
        success: false,
        message: 'An error occurred during login.',
        context: 'AuthService - login',
      });
    }
  }

  async logout(userUid: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { uid: userUid },
      });

      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }

      return {
        success: true,
        message: 'Logout successful',
      };
    } catch (error) {
      console.error('Logout error:', error);
      throw new InternalServerErrorException({
        success: false,
        message: 'An error occurred during logout.',
        context: 'AuthService - logout',
      });
    }
  }
}
