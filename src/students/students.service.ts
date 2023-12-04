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
    const { firstName, lastName, email, password, role, gender, studentClass, parents} = createStudentInput;

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
      parents

    })
    return await this.studentRepository.save(student);
  }

  async getStudentData(student: StudentDTO): Promise<Student>{
    const { email } = student;

    return await this.studentRepository.findOneBy({email:email});

  }

  async getAllStudent(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findOne(id: string): Promise<Student> {
    return await this.studentRepository.findOneBy({id:id});
  }

  async assignParentsToStudent(studentID: string, parentsID: string[]): Promise<Student> {
    try {
      const student = await this.studentRepository.findOneBy({id: studentID});
      student.parents = [ ...student.parents, ...parentsID];
       return this.studentRepository.save(student);
      
    } catch (error) {
      
    }
  }

  async getManyStudents(studentIds:string[]): Promise<Student[]>{
    return await this.studentRepository.find({
        where: {
           // ...studentIds.map(id => ({ id })),
            id: {
                // @ts-ignore
                $in: studentIds
            }
        }
    })
}

  update(id: number, updateStudentInput: UpdateStudentInput) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}