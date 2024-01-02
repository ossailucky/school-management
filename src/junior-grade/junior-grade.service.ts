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

  async findAllGrades(): Promise<JuniorGrade[]> {
    try {
      return await this.juniorGradeRepository.find();
    } catch (error) {
      throw new error;
    }
  }

  async findOne(id: string): Promise<JuniorGrade> {
    try {
      return await this.juniorGradeRepository.findOneBy({id:id})
    } catch (error) {
      throw new error;
    }
  }

  update(id: number, updateJuniorGradeInput: UpdateJuniorGradeInput) {
    return `This action updates a #${id} juniorGrade`;
  }

  async removeJuniorGrade(id: string): Promise<String> {
    try {
      const query = await this.juniorGradeRepository.delete({id:id});
      if(query.affected > 0){
        return `Grade with the ID #${id} was deleted succesfully`;
      }
    } catch (error) {
      throw new error;
    }
  }
}
