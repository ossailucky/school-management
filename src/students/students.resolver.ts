import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ID } from '@nestjs/graphql';
import { StudentsService } from './students.service';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { StudentType } from './entities/student.type';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { hasRoles } from 'src/auth/decorators/roles.decorators';
import { Role } from 'src/user/entities/user.entity';
import { StudentAuthGuard } from 'src/auth-students/guards/jwt-students-auth-guard';
import { ParentsService } from 'src/parents/parents.service';
import { AssignParentsToStudentInput } from './dto/assign-parents-student.input';
import { AssignSubjectsToStudentInput } from './dto/assign-subject-student';
import { SubjectService } from 'src/subject/subject.service';
import { StudentOrGqlGuard } from 'src/auth/guards/general-guard';

@Resolver(() => StudentType)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly parentService: ParentsService,
    private readonly subjectService: SubjectService
    ) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => StudentType)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentsService.register(createStudentInput);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Query(returns => [StudentType], { name: 'students' })
  allStudents() {
    return this.studentsService.getAllStudent();
  }

  @UseGuards(StudentAuthGuard)
  @Query(returns => StudentType, { name: 'student' })
  findOne(@Args('id') id: string) {
    return this.studentsService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => StudentType)
  async assignParentsToStudent(
    @Args("assigParentsToStudent") assignParentsToStudentInput: AssignParentsToStudentInput
  ){
    const { studentId, parentIds } = assignParentsToStudentInput;

    return await this.studentsService.assignParentsToStudent(studentId, parentIds)
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => StudentType)
  async assignSubjectsToStudent(
    @Args("assignSubjectsToStudent") assignSubjectsToStudentInput: AssignSubjectsToStudentInput
  ){
    const { studentId, subjectIds } = assignSubjectsToStudentInput;

    return await this.studentsService.assignSubjectsToStudent(studentId, subjectIds);
  }

  
  @UseGuards(StudentAuthGuard)
  @Mutation(returns => StudentType)
  updateStudent(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateStudentInput') updateStudentInput: UpdateStudentInput
    ) {
    return this.studentsService.updateStudent(id, updateStudentInput);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => String)
  removeStudent(@Args('id', { type: () => ID }) id: string) {
    return this.studentsService.removeStudent(id);
  }

  @ResolveField()
  async parents(@Parent() student: Student){
    return this.parentService.getManyParents(student.parents);
  }

  @ResolveField()
  async subjects(@Parent() student: Student){
    return this.subjectService.getManySubjects(student.subjects);
  }
}
