import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { LoginResponse, LogoutResponse } from './auth.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse, { name: 'login' })
  async login(
    @Args('loginInput') loginInput: LoginDto,
  ): Promise<LoginResponse> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => LogoutResponse)
  async logout(@Args('userUid') userUid: string) {
    return this.authService.logout(userUid);
  }
}
