import { CreateAuthStudentInput } from './create-auth-student.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthStudentInput extends PartialType(CreateAuthStudentInput) {
  @Field(() => Int)
  id: number;
}
