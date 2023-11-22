import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuthParentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
