import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { MinLength, IsNotEmpty, IsUUID,IsOptional } from 'class-validator';


@InputType()
export class CreateSubjectInput {
  @Field()
  @MinLength(1)
  @IsNotEmpty({message: "subject name cannot be empty"})
  name: string;

  @IsUUID("4", { each: true })
  @Field(() => [ID],{defaultValue: [] })
  teachers: string[];

  @IsUUID("4", { each: true })
  @IsOptional()
  @Field(() => [ID], {defaultValue: []})
  className: string[];


  @Field(()=> [ID],{defaultValue:[]})
  students: string[];
}
