import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserType } from './entities/user.type';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { hasRoles } from 'src/auth/decorators/roles.decorators';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Role } from './entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/currentuser.decorator';

@Resolver(() => UserType)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => UserType)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(returns => [UserType])
  @UseGuards(GqlAuthGuard,RolesGuard)
  @hasRoles(Role.ADMIN)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Query(returns => UserType, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@CurrentUser() user:User) {
    return user;
  }

  

  @Mutation(() => UserType)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => UserType)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
