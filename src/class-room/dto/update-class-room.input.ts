import { CreateClassRoomInput } from './create-class-room.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { MinLength, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';


@InputType()
export class UpdateClassRoomInput extends PartialType(CreateClassRoomInput) {
  @IsUUID()
  @Field(type => ID)
  id: string;

  @Field(type => [String],{nullable: true })
  classSubjects: string[];

  @IsUUID("4", { each: true })
    @Field(type => [ID], {nullable: true })
    studentsId: string[];
}
