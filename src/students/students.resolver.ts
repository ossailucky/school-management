import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
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

@Resolver(() => StudentType)
export class StudentsResolver {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly parentService: ParentsService
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

  // @Mutation(() => Student)
  // updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
  //   return this.studentsService.update(updateStudentInput.id, updateStudentInput);
  // }

  // @Mutation(() => Student)
  // removeStudent(@Args('id', { type: () => Int }) id: number) {
  //   return this.studentsService.remove(id);
  // }

  @ResolveField()
  async parents(@Parent() student: Student){
    return this.parentService.getManyParents(student.parents);
  }
}
