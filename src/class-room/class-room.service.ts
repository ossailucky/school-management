import { Injectable } from '@nestjs/common';
import { CreateClassRoomInput } from './dto/create-class-room.input';
import { UpdateClassRoomInput } from './dto/update-class-room.input';
import { InjectRepository } from '@nestjs/typeorm';
import { ClassRoom } from './entities/class-room.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { log } from 'console';


@Injectable()
export class ClassRoomService {
  constructor(@InjectRepository(ClassRoom) private classRoomRespository:Repository<ClassRoom>) {}
  async create(createClassRoomInput: CreateClassRoomInput) : Promise<ClassRoom> {

    const { className, classSubjects, students} = createClassRoomInput;

    const classRoom = this.classRoomRespository.create({
      id: uuid(),
      className: className,
      classSubjects: classSubjects,
      students: students
    });
    return await this.classRoomRespository.save(classRoom);
  }

 async findAll(): Promise<ClassRoom[]> {
    return await this.classRoomRespository.find();
  }

 async findOne(id: string): Promise<ClassRoom> {
    return await this.classRoomRespository.findOneBy({id});
  }

  async assignStudentAClass(id:string,studentsId: string[]): Promise<ClassRoom>{


    const classRoom = await this.classRoomRespository.findOneBy({id: id});


    classRoom.students = [...classRoom.students, ...studentsId];



    return await this.classRoomRespository.save(classRoom);
  }

  remove(id: number) {
    return `This action removes a #${id} classRoom`;
  }
}
