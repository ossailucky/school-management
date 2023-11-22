import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthStudentsService } from './auth-students.service';
import { AuthStudent } from './entities/auth-student.entity';
import { CreateAuthStudentInput } from './dto/create-auth-student.input';
import { UpdateAuthStudentInput } from './dto/update-auth-student.input';

@Resolver(() => AuthStudent)
export class AuthStudentsResolver {
  constructor(private readonly authStudentsService: AuthStudentsService) {}

  @Mutation(() => AuthStudent)
  createAuthStudent(@Args('createAuthStudentInput') createAuthStudentInput: CreateAuthStudentInput) {
    return this.authStudentsService.create(createAuthStudentInput);
  }

  @Query(() => [AuthStudent], { name: 'authStudents' })
  findAll() {
    return this.authStudentsService.findAll();
  }

  @Query(() => AuthStudent, { name: 'authStudent' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authStudentsService.findOne(id);
  }

  @Mutation(() => AuthStudent)
  updateAuthStudent(@Args('updateAuthStudentInput') updateAuthStudentInput: UpdateAuthStudentInput) {
    return this.authStudentsService.update(updateAuthStudentInput.id, updateAuthStudentInput);
  }

  @Mutation(() => AuthStudent)
  removeAuthStudent(@Args('id', { type: () => Int }) id: number) {
    return this.authStudentsService.remove(id);
  }
}
