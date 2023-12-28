import { Injectable } from '@nestjs/common';
import { CreateJuniorGradeInput } from './dto/create-junior-grade.input';
import { UpdateJuniorGradeInput } from './dto/update-junior-grade.input';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository } from 'typeorm';
import { JuniorGrade } from './entities/junior-grade.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JuniorGradeService {
  constructor(@InjectRepository(JuniorGrade) private juniorGradeRepository: Repository<JuniorGrade>) {}

  async createGrade(createJuniorGradeInput: CreateJuniorGradeInput): Promise<JuniorGrade> {
    const {
      studentID, 
      subjects,
      average,
      classPosition,
      remark
    } = createJuniorGradeInput;

    const grade = this.juniorGradeRepository.create({
      id: uuid(),
      studentID: studentID,
      subjects: subjects,
      average: average,
      classPosition: classPosition,
      remark: remark,


    })
    return await this.juniorGradeRepository.save(grade);
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