import { CreateClassRoomInput } from './create-class-room.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { MinLength, IsEmail, IsNotEmpty } from 'class-validator';


@InputType()
export class UpdateClassRoomInput extends PartialType(CreateClassRoomInput) {
  @Field(() => Int)
  id: number;
}
