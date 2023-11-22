import { Injectable } from '@nestjs/common';
import { CreateAuthTeacherInput } from './dto/create-auth-teacher.input';
import { UpdateAuthTeacherInput } from './dto/update-auth-teacher.input';

@Injectable()
export class AuthTeachersService {
  create(createAuthTeacherInput: CreateAuthTeacherInput) {
    return 'This action adds a new authTeacher';
  }

  findAll() {
    return `This action returns all authTeachers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authTeacher`;
  }

  update(id: number, updateAuthTeacherInput: UpdateAuthTeacherInput) {
    return `This action updates a #${id} authTeacher`;
  }

  remove(id: number) {
    return `This action removes a #${id} authTeacher`;
  }
}
