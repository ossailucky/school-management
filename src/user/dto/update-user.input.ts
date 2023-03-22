import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { IsDateString, IsUUID } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsDateString()
  @Field({nullable:true})
  DOB?: string;

  @Field(type=> ID,{nullable:true})
  subjects?:string[];

 @Field({nullable:true})
  studentClass?: string;
}
