import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthParentsService } from './auth-parents.service';
import { AuthParent } from './entities/auth-parent.entity';
import { CreateAuthParentInput } from './dto/create-auth-parent.input';
import { UpdateAuthParentInput } from './dto/update-auth-parent.input';

@Resolver(() => AuthParent)
export class AuthParentsResolver {
  constructor(private readonly authParentsService: AuthParentsService) {}

  @Mutation(() => AuthParent)
  createAuthParent(@Args('createAuthParentInput') createAuthParentInput: CreateAuthParentInput) {
    return this.authParentsService.create(createAuthParentInput);
  }

  @Query(() => [AuthParent], { name: 'authParents' })
  findAll() {
    return this.authParentsService.findAll();
  }

  @Query(() => AuthParent, { name: 'authParent' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authParentsService.findOne(id);
  }

  @Mutation(() => AuthParent)
  updateAuthParent(@Args('updateAuthParentInput') updateAuthParentInput: UpdateAuthParentInput) {
    return this.authParentsService.update(updateAuthParentInput.id, updateAuthParentInput);
  }

  @Mutation(() => AuthParent)
  removeAuthParent(@Args('id', { type: () => Int }) id: number) {
    return this.authParentsService.remove(id);
  }
}
