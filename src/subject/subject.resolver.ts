import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SubjectService } from './subject.service';
import { Subject } from './entities/subject.entity';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';
import { SubjectType } from './entities/subject.type';

@Resolver(() => SubjectType)
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @Mutation(returns => SubjectType)
  async createSubject(@Args('createSubjectInput') createSubjectInput: CreateSubjectInput) {
    return this.subjectService.createSubject(createSubjectInput);
  }

  @Query(returns => [SubjectType], { name: 'subject' })
  findAll() {
    return this.subjectService.findAll();
  }

  @Query(returns => SubjectType, { name: 'subject' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.subjectService.findOne(id);
  }

  // @Mutation(() => Subject)
  // updateSubject(@Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput) {
  //   return this.subjectService.update(updateSubjectInput.id, updateSubjectInput);
  // }

  // @Mutation(() => Subject)
  // removeSubject(@Args('id', { type: () => Int }) id: number) {
  //   return this.subjectService.remove(id);
  // }
}
