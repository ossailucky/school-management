import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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

@Resolver(() => StudentType)
export class StudentsResolver {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => StudentType)
  createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput) {
    return this.studentsService.register(createStudentInput);
  }

  // @Query(() => [Student], { name: 'students' })
  // findAll() {
  //   return this.studentsService.findAll();
  // }

  // @Query(() => Student, { name: 'student' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.studentsService.findOne(id);
  // }

  // @Mutation(() => Student)
  // updateStudent(@Args('updateStudentInput') updateStudentInput: UpdateStudentInput) {
  //   return this.studentsService.update(updateStudentInput.id, updateStudentInput);
  // }

  // @Mutation(() => Student)
  // removeStudent(@Args('id', { type: () => Int }) id: number) {
  //   return this.studentsService.remove(id);
  // }
}
