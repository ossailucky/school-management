import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ParentsService } from './parents.service';
import { Parent } from './entities/parent.entity';
import { CreateParentInput } from './dto/create-parent.input';
import { UpdateParentInput } from './dto/update-parent.input';

@Resolver(() => Parent)
export class ParentsResolver {
  constructor(private readonly parentsService: ParentsService) {}

  @Mutation(() => Parent)
  createParent(@Args('createParentInput') createParentInput: CreateParentInput) {
    return this.parentsService.create(createParentInput);
  }

  @Query(() => [Parent], { name: 'parents' })
  findAll() {
    return this.parentsService.findAll();
  }

  @Query(() => Parent, { name: 'parent' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.parentsService.findOne(id);
  }

  @Mutation(() => Parent)
  updateParent(@Args('updateParentInput') updateParentInput: UpdateParentInput) {
    return this.parentsService.update(updateParentInput.id, updateParentInput);
  }

  @Mutation(() => Parent)
  removeParent(@Args('id', { type: () => Int }) id: number) {
    return this.parentsService.remove(id);
  }
}
