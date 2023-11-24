import { IsDateString } from 'class-validator';
import { CreateParentInput } from './create-parent.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateParentInput extends PartialType(CreateParentInput) {
  @Field(type=> ID,{nullable:true})
  children?:string[];

 
}
