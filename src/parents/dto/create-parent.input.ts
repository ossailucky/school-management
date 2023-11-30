import { InputType, Field, ID } from '@nestjs/graphql';
import { MinLength, IsEmail, IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateParentInput {
  @Field()
  @IsNotEmpty({message:"first name Field cannot be empty"})
  @MinLength(2)
  firstName: string;

  @Field()
  @IsNotEmpty({message:"last name Field cannot be empty"})
  @MinLength(2)
  lastName: string;

  @Field()
  @IsNotEmpty({message:"Email Field cannot be empty"})
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty({message:"password Field is required"})
  @MinLength(8)
  password: string;

  @Field()
  @IsNotEmpty({message:"User role Field cannot be empty"})
  role:string;

  @Field()
  @IsNotEmpty({message:"Gender Field cannot be empty"})
  gender: string;

  @IsUUID("4", { each: true })
  @Field(() => [ID], { defaultValue: [] })
  children: string[];
}
