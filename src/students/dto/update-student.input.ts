import { IsOptional } from 'class-validator';
import { CreateStudentInput } from './create-student.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStudentInput extends PartialType(CreateStudentInput) {
  @Field()
  @IsOptional()
  DOB:string;
}
