import { ObjectType, Field, ID } from '@nestjs/graphql';
import { StudentType } from 'src/students/entities/student.type';

@ObjectType()
export class SubjectInfoType {
    @Field(type => ID)
    subjectID: string;

    @Field()
    testScore: number;

    @Field()
    CA: number;

    @Field()
    examScore: number;

    @Field()
    totalScore: number;

    @Field()
    position: string;

}

@ObjectType("JuniorGrade")
export class JuniorGradeType {
  @Field(type => ID)
  id: string;

  @Field(type => StudentType)
  studentID:string;

  @Field(type => [SubjectInfoType])
  subjects: SubjectInfoType[];


  @Field()
  average: number;

  @Field()
  classPosition: string;

  @Field()
  remark:string;

}
