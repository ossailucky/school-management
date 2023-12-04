import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { SubjectService } from './subject.service';
import { Subject } from './entities/subject.entity';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';
import { SubjectType } from './entities/subject.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { hasRoles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/user/entities/user.entity';

@Resolver(() => SubjectType)
export class SubjectResolver {
  constructor(private readonly subjectService: SubjectService) {}

  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Mutation(returns => SubjectType)
  async createSubject(@Args('createSubjectInput') createSubjectInput: CreateSubjectInput) {
    return this.subjectService.createSubject(createSubjectInput);
  }

  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Query(returns => [SubjectType], { name: 'subjects' })
  findAll() {
    return this.subjectService.getAllSubjects();
  }

  @Query(returns => SubjectType, { name: 'subject' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.subjectService.getOneSubject(id);
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
