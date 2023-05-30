import { Module } from '@nestjs/common';
import { ClassRoomService } from './class-room.service';
import { ClassRoomResolver } from './class-room.resolver';
import { ClassRoom } from './entities/class-room.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[TypeOrmModule.forFeature([ClassRoom]),
  UserModule
],
  providers: [ClassRoomResolver, ClassRoomService],
  exports:[ClassRoomService]
})
export class ClassRoomModule {}
