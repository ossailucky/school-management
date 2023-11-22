import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthStudentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
