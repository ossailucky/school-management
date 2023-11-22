import { Injectable } from '@nestjs/common';
import { CreateAuthStudentInput } from './dto/create-auth-student.input';
import { UpdateAuthStudentInput } from './dto/update-auth-student.input';

@Injectable()
export class AuthStudentsService {
  create(createAuthStudentInput: CreateAuthStudentInput) {
    return 'This action adds a new authStudent';
  }

  findAll() {
    return `This action returns all authStudents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authStudent`;
  }

  update(id: number, updateAuthStudentInput: UpdateAuthStudentInput) {
    return `This action updates a #${id} authStudent`;
  }

  remove(id: number) {
    return `This action removes a #${id} authStudent`;
  }
}
