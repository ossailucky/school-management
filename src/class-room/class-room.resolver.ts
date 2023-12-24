import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ID } from '@nestjs/graphql';
import { ClassRoomService } from './class-room.service';
import { ClassRoom } from './entities/class-room.entity';
import { CreateClassRoomInput } from './dto/create-class-room.input';
import { UpdateClassRoomInput } from './dto/update-class-room.input';
import { ClassRoomType } from './entities/class-room.type';
import { UseGuards } from '@nestjs/common/decorators';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Role } from 'src/user/entities/user.entity';
import { GqlAuthGuard } from 'src/auth/guards/jwt-auth-guard';
import { hasRoles } from 'src/auth/decorators/roles.decorators';
import { UserService } from 'src/user/user.service';
import { AssignClassRoom } from './dto/assign-dto';
import { AssignSubjectClass } from './dto/assign-subjects';
import { StudentsService } from 'src/students/students.service';
import { SubjectService } from 'src/subject/subject.service';

@Resolver(of => ClassRoomType)
export class ClassRoomResolver {
  constructor(
    private readonly classRoomService: ClassRoomService,
    private studentService:StudentsService,
    private subjectService: SubjectService
    ) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => ClassRoomType)
  createClassRoom(@Args('createClassRoomInput') createClassRoomInput: CreateClassRoomInput,) {
    return this.classRoomService.create(createClassRoomInput);
  }

  @Query(returns => [ClassRoomType])
  AllClassRoom() {
    return this.classRoomService.findAll();
  }

  @Query(returns => ClassRoomType)
  ClassRoom(@Args('id') id:string) {
    return this.classRoomService.findOne(id);
  }

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation(returns => ClassRoomType)
  assignStudentToClass(@Args('assignStudentClass') assignStudentClass: AssignClassRoom) {
    const { classId, studentIds} = assignStudentClass;
    return this.classRoomService.assignStudentAClass(classId, studentIds);
  }

  @Mutation(returns => ClassRoomType)
  assignSubjectsToClass(@Args('assignSubjectsClass') assignSubjectsClass: AssignSubjectClass) {
    const { classId, subjectIds} = assignSubjectsClass;
    return this.classRoomService.assignSubjectsAClass(classId, subjectIds);
  }

  @Mutation(returns => ClassRoomType)
  updateClassRoom(
    @Args("id",{ type: () => ID }) id: string,
    @Args('updateClassRoomInput') updateClassRoom: UpdateClassRoomInput
    ){
      return this.classRoomService.updateClassRoom(id, updateClassRoom);
    }


  @Mutation(() => ClassRoomType)
  removeClassRoom(@Args('id', { type: () => Int }) id: number) {
    return this.classRoomService.remove(id);
  }

  @ResolveField()
  async students(@Parent() classRoom: ClassRoom){
    return await this.studentService.getManyStudents(classRoom.students);
  }

}
