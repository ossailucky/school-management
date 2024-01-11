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
    try {
      return await this.classRoomRespository.find();
    } catch (error) {
      throw error;
    }   
  }

 async findOne(id: string): Promise<ClassRoom> {
  try {
    return await this.classRoomRespository.findOneBy({id});
  } catch (error) {
    throw error;
  }
    
  }

  async assignStudentAClass(id:string,studentsId: string[]): Promise<ClassRoom>{

    try {
      
      const classRoom = await this.classRoomRespository.findOneBy({id: id});


      classRoom.students = [...classRoom.students, ...studentsId];



      return await this.classRoomRespository.save(classRoom);
    } catch (error) {
      throw error;
    }

    
  }

  async assignSubjectsAClass(id:string, subjectsId: string[]): Promise<ClassRoom>{

    try {
      const classRoom = await this.classRoomRespository.findOneBy({id: id});


      classRoom.classSubjects = [...classRoom.classSubjects, ...subjectsId];



      return await this.classRoomRespository.save(classRoom);
    } catch (error) {
      throw error;
    }
    
  }

  async updateClassRoom(id:string, updateClassRoom: UpdateClassRoomInput):Promise<ClassRoom> {
    try {
      const classRoom = await this.classRoomRespository.findOneBy({id:id});
      if(classRoom){
        Object.assign(classRoom, updateClassRoom);

        return await this.classRoomRespository.save(classRoom);
      }
    } catch (error) {
      throw error;
    }
  }

  async removeClassRoom(id: string): Promise<String> {
    try {
      const query = await this.classRoomRespository.delete({id:id});
      if(query.affected > 0){
        return  `class room with the ID ${id} was deleted successfully `;
      }
    } catch (error) {
      throw error;
    }
  }
}
