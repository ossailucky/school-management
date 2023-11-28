import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParentsService } from './parents.service';
import { Parent } from './entities/parent.entity';
import { CreateParentInput } from './dto/create-parent.input';
import { UpdateParentInput } from './dto/update-parent.input';
import { ParentType } from './entities/parent.type';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { UseGuards } from '@nestjs/common';
import { hasRoles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/user/entities/user.entity';
import { ParentAuthGuard } from 'src/auth-parents/guards/jwt-parent-auth-guard';


@Resolver(() => ParentType)
export class ParentsResolver {
  constructor(private readonly parentsService: ParentsService) {}

  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(returns => ParentType)
  createParent(@Args('createParentInput') createParentInput: CreateParentInput) {
    return this.parentsService.registerParent(createParentInput);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Query(returns => [ParentType], { name: 'parents' })
  findAll() {
    return this.parentsService.findAllParents();
  }

  @UseGuards(ParentAuthGuard)
  @Query(returns => ParentType, { name: 'parent' })
  findOne(@Args('id') id: string) {
    return this.parentsService.findOne(id);
  }

  // @Mutation(() => Parent)
  // updateParent(@Args('updateParentInput') updateParentInput: UpdateParentInput) {
  //   return this.parentsService.update(updateParentInput.id, updateParentInput);
  // }

  // @Mutation(() => Parent)
  // removeParent(@Args('id', { type: () => Int }) id: number) {
  //   return this.parentsService.remove(id);
  // }
}
