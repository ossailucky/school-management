import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
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
import { AssignTeacherToSubjectInput } from './dto/assign-teacher-subject';
import { TeachersService } from 'src/teachers/teachers.service';
import { AssignSudentsToSubjectInput } from './dto/assign-subjects-students';
import { StudentsService } from 'src/students/students.service';

@Resolver(() => SubjectType)
export class SubjectResolver {
  constructor(
    private readonly subjectService: SubjectService,
    private readonly teacherService: TeachersService,
    private readonly studentService: StudentsService,

    ) {}

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

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => SubjectType)
  async assignTeacherToSubject(
    @Args("assignTeacherToSubject") assignTeacherToSubject: AssignTeacherToSubjectInput
  ){
    const {subjectId, teacherIds } = assignTeacherToSubject;

    return await this.subjectService.assignTeacherToSubject(subjectId, teacherIds);
  }

  @Mutation(returns => SubjectType)
  async assignSubjectToStudents(
    @Args("assignStudentToSubject") assignStudentsToSubject: AssignSudentsToSubjectInput
  ){
    const {subjectId, studentIds } = assignStudentsToSubject;

    return await this.subjectService.assignStudentsToSubject(subjectId,studentIds);
  }


  // @Mutation(() => Subject)
  // updateSubject(@Args('updateSubjectInput') updateSubjectInput: UpdateSubjectInput) {
  //   return this.subjectService.update(updateSubjectInput.id, updateSubjectInput);
  // }

  // @Mutation(() => Subject)
  // removeSubject(@Args('id', { type: () => Int }) id: number) {
  //   return this.subjectService.remove(id);
  // }

  @ResolveField()
  async teachers(@Parent() subject: Subject){
    return await this.teacherService.getManyTeachers(subject.teachers);
  }

  @ResolveField()
  async students(@Parent() subject: Subject){
    return await this.studentService.getManyStudents(subject.students);
  }
}
