import { CreateClassRoomInput } from './create-class-room.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { MinLength, IsEmail, IsNotEmpty, IsUUID, IsOptional } from 'class-validator';


@InputType()
export class UpdateClassRoomInput extends PartialType(CreateClassRoomInput) {

  @IsOptional()
  @Field(type => [String],{nullable: true })
  classSubjects: string[];

  @IsOptional()
  @IsUUID("4", { each: true })
  @Field(type => [ID], {nullable: true })
  studentsId: string[];
}
