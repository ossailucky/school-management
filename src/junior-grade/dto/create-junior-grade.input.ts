import { InputType, Field, ID } from '@nestjs/graphql';
import { MinLength, IsEmail, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

@InputType()
export class SubjectInput {
  @Field(type => ID)
    subjectID: string;

    @Field()
    subjectName: string;

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


@InputType()
export class CreateJuniorGradeInput {
  @Field()
  @IsNotEmpty({message:"student ID Field cannot be empty"})
  studentID: string;

  @Field(type => [SubjectInput])
  @IsNotEmpty({message:"mathematics Field cannot be empty"})
  subjects: SubjectInput[];


  @Field()
  @IsNotEmpty({message:"average score field cannot empty"})
  average: number;

  @Field()
  @IsNotEmpty({message:"student class position Field cannot be empty"})
  classPosition:string;

  @Field()
  @IsNotEmpty({message:"remark Field cannot be empty"})
  remark: string;

}
