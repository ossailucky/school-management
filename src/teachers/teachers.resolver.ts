import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TeachersService } from './teachers.service';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { TeacherType } from './entities/teacher.type';

@Resolver(() => TeacherType)
export class TeachersResolver {
  constructor(private readonly teachersService: TeachersService) {}

  @Mutation(returns => TeacherType)
  createTeacher(@Args('createTeacherInput') createTeacherInput: CreateTeacherInput) {
    return this.teachersService.registerTeacher(createTeacherInput);
  }

  @Query(() => [TeacherType], { name: 'teachers' })
  findAll() {
    return this.teachersService.findAll();
  }

  @Query(() => TeacherType, { name: 'teacher' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.teachersService.findOne(id);
  }

  @Mutation(() => TeacherType)
  updateTeacher(@Args('updateTeacherInput') updateTeacherInput: UpdateTeacherInput) {
    return this.teachersService.update(updateTeacherInput.id, updateTeacherInput);
  }

  @Mutation(() => TeacherType)
  removeTeacher(@Args('id', { type: () => Int }) id: number) {
    return this.teachersService.remove(id);
  }
}
