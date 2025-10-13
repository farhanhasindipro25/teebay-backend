import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./users.dto";
import { User } from "../entities/user.entity";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  async findAll(): Promise<User[]> {
    return this.usersService.getUsers();
  }

  @Mutation(() => User, { name: 'createUser' })
  async create(
    @Args('createUserInput') createUserInput: CreateUserDto,
  ): Promise<User> {
    return this.usersService.createUser(createUserInput);
  }
}
