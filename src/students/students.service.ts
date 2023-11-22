import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { Student } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';

@Injectable()
export class StudentsService {
  constructor(@InjectRepository(Student) private studentRepository: Repository<Student>) {}
  async register(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName, email, password, role, gender, studentClass} = createStudentInput;

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

    })
    return await this.studentRepository.save(student);
  }

  findAll() {
    return `This action returns all students`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentInput: UpdateStudentInput) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
