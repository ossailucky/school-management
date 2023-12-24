import { Module, forwardRef } from '@nestjs/common';
import { ClassRoomService } from './class-room.service';
import { ClassRoomResolver } from './class-room.resolver';
import { ClassRoom } from './entities/class-room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { SubjectModule } from 'src/subject/subject.module';
import { StudentsModule } from 'src/students/students.module';

@Module({
  imports:[
    forwardRef(()=> StudentsModule),
    forwardRef(()=> SubjectModule),
    TypeOrmModule.forFeature([ClassRoom]),
    UserModule
],
  providers: [ClassRoomResolver, ClassRoomService],
  exports:[ClassRoomService]
})
export class ClassRoomModule {}
