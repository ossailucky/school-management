import { Injectable } from '@nestjs/common';
import { CreateSubjectInput } from './dto/create-subject.input';
import { UpdateSubjectInput } from './dto/update-subject.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';


@Injectable()
export class SubjectService {
  constructor(@InjectRepository(Subject) private subjectRepository: Repository<Subject>) {}
  async createSubject(createSubjectInput: CreateSubjectInput): Promise<Subject> {

    const {name, className, teachers, students} = createSubjectInput;

    try {
      
      const subject = this.subjectRepository.create({
        id: uuid(),
        name: name,
        className: null,
        teachers: teachers,
        students: students
      });

      return await this.subjectRepository.save(subject);


    } catch (error) {
      throw new error;
    }
  }

  findAll() {
    return `This action returns all subject`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subject`;
  }

  update(id: number, updateSubjectInput: UpdateSubjectInput) {
    return `This action updates a #${id} subject`;
  }

  remove(id: number) {
    return `This action removes a #${id} subject`;
  }
}
