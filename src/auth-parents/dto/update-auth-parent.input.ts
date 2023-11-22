import { CreateAuthParentInput } from './create-auth-parent.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuthParentInput extends PartialType(CreateAuthParentInput) {
  @Field(() => Int)
  id: number;
}
