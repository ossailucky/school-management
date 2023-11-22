import { CreateAuthTeacherInput } from './create-auth-teacher.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthTeacherInput extends PartialType(CreateAuthTeacherInput) {
  @Field(() => Int)
  id: number;
}
