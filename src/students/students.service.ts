import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { StudentDTO } from 'src/auth-students/dto/auth-student';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>) {}
  async register(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName, email, password, role, gender, studentClass, parents, subjects} = createStudentInput;

    const hashPassword : string = await bcrypt.hash(password,10);
    const student = await this.studentRepository.create({
      id: uuid(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
      role:role,
      //DOB: DOB,
      gender: gender,
      studentClass: studentClass,
      subjects,
      parents

    })
    return await this.studentRepository.save(student);
  }

  async getStudentData(student: StudentDTO): Promise<Student>{
    try {
      const { email } = student;

      return await this.studentRepository.findOneBy({email:email});
    } catch (error) {
      throw error;
    }
    

  }

  async getAllStudent(): Promise<Student[]> {
    try {
      return await this.studentRepository.find();
    } catch (error) {
      throw error;
    }
    
  }

  async findOne(id: string): Promise<Student> {
    try {
      return await this.studentRepository.findOneBy({id:id});
    } catch (error) {
      throw error;
    }
    
  }

  async assignParentsToStudent(studentID: string, parentsID: string[]): Promise<Student> {
    try {
      const student = await this.studentRepository.findOneBy({id: studentID});
      student.parents = [ ...student.parents, ...parentsID];
       return this.studentRepository.save(student);
      
    } catch (error) {
      throw error;
    }
  }

  async assignSubjectsToStudent(studentID: string, subjectsID: string[]): Promise<Student> {
    try {
      const student = await this.studentRepository.findOneBy({id: studentID});
      student.subjects = [ ...student.subjects, ...subjectsID];
       return this.studentRepository.save(student);
      
    } catch (error) {
      throw  error;
    }
  }

  async getManyStudents(studentIds:string[]): Promise<Student[]>{
    try {
      return await this.studentRepository.find({
        where: {
           
            id: {
                // @ts-ignore
                $in: studentIds
            }
        }
    })
    } catch (error) {
      throw error;
    }
    
}

  async updateStudent(id: string, updateStudent: UpdateStudentInput): Promise<Student>{
    try {
      const student = await this.studentRepository.findOneBy({id: id});
      if(student){
        Object.assign(student, updateStudent);

        return await this.studentRepository.save(student);
      }
    } catch (error) {
      throw error;
    }
  }

  async removeStudent(id: string): Promise<String> {
    try {
      const query = await this.studentRepository.delete({id:id});
      if(query.affected > 0) {
        return ` Student with the ID ${id} was deleted successfully`;
      }
      
    } catch (error) {
      throw error;
    }
  }
}
