import { Injectable } from '@nestjs/common';
import { CreateClassRoomInput } from './dto/create-class-room.input';
import { UpdateClassRoomInput } from './dto/update-class-room.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassRoom } from './entities/class-room.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';


@Injectable()
export class ClassRoomService {
  constructor(@InjectRepository(ClassRoom) private classRoomRespository:Repository<ClassRoom>) {}
 async create(createClassRoomInput: CreateClassRoomInput) : Promise<ClassRoom> {

    const { className} = createClassRoomInput;

    const classRoom = this.classRoomRespository.create({
      id: uuid(),
      className: className
    });
    return await this.classRoomRespository.save(classRoom);
  }

  findAll() {
    return `This action returns all classRoom`;
  }

  findOne(id: number) {
    return `This action returns a #${id} classRoom`;
  }

  update(id: number, updateClassRoomInput: UpdateClassRoomInput) {
    return `This action updates a #${id} classRoom`;
  }

  remove(id: number) {
    return `This action removes a #${id} classRoom`;
  }
}
