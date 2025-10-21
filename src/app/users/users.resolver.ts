import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './users.dto';
import { User, UserResponse, UsersResponse } from './user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UsersResponse, { name: 'users' })
  async findAll(): Promise<UsersResponse> {
    return this.usersService.getUsers();
  }

  @Query(() => UserResponse, { name: 'user' })
  async findOne(@Args('uid') uid: string): Promise<UserResponse> {
    return this.usersService.getUserByUid(uid);
  }

  @Mutation(() => UserResponse, { name: 'createUser' })
  async create(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<UserResponse> {
    return this.usersService.createUser(createUserInput);
  }
}
