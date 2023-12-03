import { CreateSubjectInput } from './create-subject.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateSubjectInput extends PartialType(CreateSubjectInput) {
  @Field(type=> ID,{nullable:true})
  students?:string[];

}
