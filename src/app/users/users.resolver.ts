import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./users.dto";
import { User } from "./user.entity";


@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('uid') uid: string): Promise<User> {
    return this.usersService.getUserByUid(uid);
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }
}
