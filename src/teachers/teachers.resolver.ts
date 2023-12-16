import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ID } from '@nestjs/graphql';
import { TeachersService } from './teachers.service';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { TeacherType } from './entities/teacher.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { hasRoles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/user/entities/user.entity';
import { TeacherAuthGuard } from 'src/auth-teachers/guards/teacher-auth-guard';
import { SubjectService } from 'src/subject/subject.service';
import { AssignSubjectToTeacherInput } from './dto/assign-subjects-teacher';
import { Teacher } from './entities/teacher.entity';

@Resolver(() => TeacherType)
export class TeachersResolver {
  constructor(
    private readonly teachersService: TeachersService,
    private readonly subjectService: SubjectService
    ) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => TeacherType)
  createTeacher(@Args('createTeacherInput') createTeacherInput: CreateTeacherInput) {
    return this.teachersService.registerTeacher(createTeacherInput);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Query(returns => [TeacherType], { name: 'teachers' })
  getAllTeachers() {
    return this.teachersService.getAllTeachers();
  }
   
  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => TeacherType)
  async assignSubjectsToTeacher(
    @Args("assignSubjectsToTeacher") assignSubjectsToTeacher: AssignSubjectToTeacherInput
  ){
    const { teacherId, subjectIds } = assignSubjectsToTeacher;

    return await this.teachersService.assignSubjectsToTeacher(teacherId, subjectIds);
  }

  @UseGuards(TeacherAuthGuard)
  @Query(returns => TeacherType, { name: 'teacher' })
  async findOne(@Args('id') id: string) {
    return  await this.teachersService.findOne(id);
  }

  @Mutation(() => TeacherType)
  updateTeacher(@Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput) {
    return this.teachersService.update(updateTeacherInput.id, updateTeacherInput);
  }

  @Mutation(returns => String)
  removeTeacher(@Args('id', { type: () => ID }) id: string) {
    return this.teachersService.removeTeacher(id);
  }

  @ResolveField()
  async subjects(@Parent() teacher: Teacher){
    return this.subjectService.getManySubjects(teacher.subjects);
  }
}
