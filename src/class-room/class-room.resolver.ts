import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
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

@Resolver(of => ClassRoomType)
export class ClassRoomResolver {
  constructor(
    private readonly classRoomService: ClassRoomService,
    private userService:UserService
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
  @Mutation(() => ClassRoomType)
  updateClassRoom(@Args('updateClassRoomInput') updateClassRoomInput: UpdateClassRoomInput) {
    return this.classRoomService.assignStudentAClass(updateClassRoomInput.id, updateClassRoomInput.studentsId);
  }

  @Mutation(() => ClassRoomType)
  removeClassRoom(@Args('id', { type: () => Int }) id: number) {
    return this.classRoomService.remove(id);
  }

  @ResolveField()
  async students(@Parent() classRoom: ClassRoom){
    return await this.userService.getManyStudents(classRoom.students);
  }

}
