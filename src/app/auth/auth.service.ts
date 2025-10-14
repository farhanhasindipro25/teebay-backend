import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(loginInput: LoginDto) {
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
  }
}
