import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { MinLength, IsNotEmpty, IsUUID } from 'class-validator';


@InputType()
export class CreateSubjectInput {
  @Field()
  @MinLength(1)
  @IsNotEmpty({message: "subject name cannot be empty"})
  subjectName: string;

  @Field(()=> [ID],{defaultValue:[]})
  students: string[];
}
