import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { MinLength, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateClassRoomInput {
  @Field()
  @MinLength(1)
  @IsNotEmpty({message: "class Name cannot be empty"})
  className: string;

  @IsUUID("4", { each: true })
  @Field(() => [ID],{defaultValue: [] })
  classSubjects: string[];

  @IsUUID("4", { each: true })
  @Field(() => [ID], {defaultValue: [] })
  students: string[];

}
