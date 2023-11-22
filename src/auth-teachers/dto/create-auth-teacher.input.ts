import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthTeacherInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
