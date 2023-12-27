import { Injectable } from '@nestjs/common';
import { CreateJuniorGradeInput } from './dto/create-junior-grade.input';
import { UpdateJuniorGradeInput } from './dto/update-junior-grade.input';

@Injectable()
export class JuniorGradeService {
  create(createJuniorGradeInput: CreateJuniorGradeInput) {
    return 'This action adds a new juniorGrade';
  }

  findAll() {
    return `This action returns all juniorGrade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} juniorGrade`;
  }

  update(id: number, updateJuniorGradeInput: UpdateJuniorGradeInput) {
    return `This action updates a #${id} juniorGrade`;
  }

  remove(id: number) {
    return `This action removes a #${id} juniorGrade`;
  }
}
