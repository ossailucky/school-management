import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherInput } from './dto/create-teacher.input';
import { UpdateTeacherInput } from './dto/update-teacher.input';
import { TeacherAuthDTO } from 'src/auth-teachers/dto/auth-teacher';

@Injectable()
export class TeachersService {
  constructor(@InjectRepository(Teacher) private teacherRepository: Repository<Teacher>) {}
  async registerTeacher(createTeacherInput: CreateTeacherInput): Promise<Teacher>{
    const { firstName, lastName, email, password, DOB, gender, subjects} = createTeacherInput;

    const hashPassword : string = await bcrypt.hash(password,10);

    const teacher = this.teacherRepository.create({
      id: uuid(),
      firstName:firstName,
      lastName:lastName,
      email:email,
      password:hashPassword,
      DOB: DOB,
      gender: gender,
      subjects
    });


    return await this.teacherRepository.save(teacher);
  }

  async getTeacherData(teacher: TeacherAuthDTO): Promise<Teacher>{
    const { email } = teacher;
    return await this.teacherRepository.findOneBy({email: email});
  }

  async getAllTeachers(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  async findOne(id: string): Promise<Teacher> {
    try {
      return await this.teacherRepository.findOneBy({id:id});
    } catch (error) {
      throw error;
    }
  }

  async getManyTeachers(teacherIds:string[]): Promise<Teacher[]>{
    try {
      return await this.teacherRepository.find({
        where: {
          // ...studentIds.map(id => ({ id })),
           id: {
               // @ts-ignore
               $in: teacherIds
           }
       }
      });
    } catch (error) {
      throw error;
    }
  }

  async assignSubjectsToTeacher(teacherID: string, subjectsID: string[]): Promise<Teacher>{

    try {
      const teacher = await this.teacherRepository.findOneBy({id: teacherID});

      teacher.subjects = [ ...teacher.subjects, ...subjectsID];

      return await this.teacherRepository.save(teacher);
      
    } catch (error) {
      throw error;
    }
  }

async updateTeacher(id: string, updateTeacherInput: UpdateTeacherInput): Promise<Teacher> {
  try {
    const teacher = await this.teacherRepository.findOneBy({id: id});
    if(teacher){
      Object.assign(teacher, updateTeacherInput);

      return await this.teacherRepository.save(teacher);
    }
  } catch (error) {
    throw error;
  }

}

 async removeTeacher(id: string): Promise<String> {
    try {
      const query = await this.teacherRepository.delete({id:id});
      if(query.affected > 0){
        return `Teacher with  the ID ${id} was deleted successfully`;
      }
    } catch (error) {
      throw error;
    }
  }
}
