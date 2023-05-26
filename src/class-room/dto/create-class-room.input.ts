import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { MinLength, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateClassRoomInput {
  @Field()
  @IsNotEmpty({message: "class Name cannot be empty"})
  className: string;

  // @Field(() => [String])
  // classSubjects: string[];

  // @IsUUID("4", { each: true })
  //   @Field(() => [ID], { defaultValue: [] })
  //   students: string[];
}
