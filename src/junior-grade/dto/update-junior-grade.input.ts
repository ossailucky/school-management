import { CreateJuniorGradeInput } from './create-junior-grade.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateJuniorGradeInput extends PartialType(CreateJuniorGradeInput) {
  
}
