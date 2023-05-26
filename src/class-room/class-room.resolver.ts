import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
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

@Resolver(() => ClassRoomType)
export class ClassRoomResolver {
  constructor(private readonly classRoomService: ClassRoomService) {}

  @UseGuards(GqlAuthGuard, RolesGuard)
  @hasRoles(Role.ADMIN, Role.SECRETARY)
  @Mutation((returns) => ClassRoomType)
  createClassRoom(@Args('createClassRoomInput') createClassRoomInput: CreateClassRoomInput) {
    return this.classRoomService.create(createClassRoomInput);
  }

  @Query(returns => [ClassRoomType], { name: 'classroom' })
  findAll() {
    return this.classRoomService.findAll();
  }

  @Query(returns => ClassRoomType, { name: 'classroom' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.classRoomService.findOne(id);
  }

  @Mutation(() => ClassRoomType)
  updateClassRoom(@Args('updateClassRoomInput') updateClassRoomInput: UpdateClassRoomInput) {
    return this.classRoomService.update(updateClassRoomInput.id, updateClassRoomInput);
  }

  @Mutation(() => ClassRoomType)
  removeClassRoom(@Args('id', { type: () => Int }) id: number) {
    return this.classRoomService.remove(id);
  }
}
