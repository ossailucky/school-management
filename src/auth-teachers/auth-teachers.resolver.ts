import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthTeachersService } from './auth-teachers.service';
import { AuthTeacher } from './entities/auth-teacher.entity';
import { CreateAuthTeacherInput } from './dto/create-auth-teacher.input';
import { UpdateAuthTeacherInput } from './dto/update-auth-teacher.input';

@Resolver(() => AuthTeacher)
export class AuthTeachersResolver {
  constructor(private readonly authTeachersService: AuthTeachersService) {}

  @Mutation(() => AuthTeacher)
  createAuthTeacher(@Args('createAuthTeacherInput') createAuthTeacherInput: CreateAuthTeacherInput) {
    return this.authTeachersService.create(createAuthTeacherInput);
  }

  @Query(() => [AuthTeacher], { name: 'authTeachers' })
  findAll() {
    return this.authTeachersService.findAll();
  }

  @Query(() => AuthTeacher, { name: 'authTeacher' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.authTeachersService.findOne(id);
  }

  @Mutation(() => AuthTeacher)
  updateAuthTeacher(@Args('updateAuthTeacherInput') updateAuthTeacherInput: UpdateAuthTeacherInput) {
    return this.authTeachersService.update(updateAuthTeacherInput.id, updateAuthTeacherInput);
  }

  @Mutation(() => AuthTeacher)
  removeAuthTeacher(@Args('id', { type: () => Int }) id: number) {
    return this.authTeachersService.remove(id);
  }
}
