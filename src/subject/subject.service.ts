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

  async getAllSubjects(): Promise<Subject[]> {
    try {
      return await this.subjectRepository.find();
    } catch (error) {
      throw new error;
    }
  }

  async  getOneSubject(id: string): Promise<Subject> {
    try {
      return await this.subjectRepository.findOneBy({id:id});
    } catch (error) {
      throw new error;
    }
  }
  
  async assignTeacherToSubject(subjectID: string, teachersID: string[]): Promise<Subject>{
    try {
      const subject = await this.subjectRepository.findOneBy({id: subjectID});

      subject.teachers = [ ...subject.teachers, ...teachersID];

      return await this.subjectRepository.save(subject);
    } catch (error) {
      throw new error;
    }
  }

  async assignStudentsToSubject(subjectID: string, studentsID: string[]): Promise<Subject>{
    try {
      
      const subject = await this.subjectRepository.findOneBy({id: subjectID});

      subject.students = [...subject.students, ...studentsID];
      
      return await this.subjectRepository.save(subject);
    } catch (error) {
      throw new error;
    }
  }

  async getManySubjects(subjectIds: string[]): Promise<Subject[]> {

    try {
      return await this.subjectRepository.find({
        where: {
          id: {
            //@ts-ignore
            $in: subjectIds
          }
        }
      })
    } catch (error) {
      throw new error;
    }
  }

  update(id: number, updateSubjectInput: UpdateSubjectInput) {
    return `This action updates a #${id} subject`;
  }

 async removeSubject(id: string): Promise<String> {
    try {
      const query = await this.subjectRepository.delete({id:id});
      if(query.affected > 0){
        return  `Subject with the ID ${id} was deleted successfully `;
      }
    } catch (error) {
      throw new error;
    }
  }
}
