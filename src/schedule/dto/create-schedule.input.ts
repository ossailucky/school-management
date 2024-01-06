import { InputType, Int, Field } from '@nestjs/graphql';
import { MinLength, IsNotEmpty, IsUUID,IsOptional, IsString } from 'class-validator';


@InputType()
export class CreateScheduleInput {
  @Field()
  @MinLength(2)
  @IsString({message: "Field is a string"})
  @IsNotEmpty({message: "Event name can not be empty"})
  eventName: string;

  @Field()
  @MinLength(10)
  @IsString({message: "Field is a string"})
  @IsNotEmpty({message: "Event Description can not be empty"})
  eventDescription: string;

  @Field(()=> [String])
  @IsNotEmpty({message: "Event name can not be empty"})
  eventDate: string[];

}
