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
      throw error;
    }
  }

  async findOne(id: string): Promise<JuniorGrade> {
    try {
      return await this.juniorGradeRepository.findOneBy({id:id})
    } catch (error) {
      throw error;
    }
  }

  async updateJuniorGrade(id: string, updateJuniorGradeInput: UpdateJuniorGradeInput): Promise<JuniorGrade> {
   try {
     const grade = await this.juniorGradeRepository.findOneBy({id:id});
     if(grade){
      Object.assign(grade,updateJuniorGradeInput);

      return await this.juniorGradeRepository.save(grade);
     }
   } catch (error) {
      throw error;
   }
  }

  async removeJuniorGrade(id: string): Promise<String> {
    try {
      const query = await this.juniorGradeRepository.delete({id:id});
      if(query.affected > 0){
        return `Grade with the ID #${id} was deleted succesfully`;
      }
    } catch (error) {
      throw error;
    }
  }
}
