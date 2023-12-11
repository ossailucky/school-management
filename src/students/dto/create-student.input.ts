import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { MinLength, IsEmail, IsNotEmpty, IsOptional, IsDate, IsUUID } from 'class-validator';

@InputType()
export class CreateStudentInput {
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

  // @Field()
  // @IsNotEmpty({message:"Email Field cannot be empty"})
  // @IsDate()
  // DOB: Date;

  @Field()
  @IsOptional()
  role:string;

  @Field()
  @IsNotEmpty({message:"Gender Field cannot be empty"})
  gender: string;

  @Field()
  @IsNotEmpty({message:"Gender Field cannot be empty"})
  studentClass: string;

  @IsUUID("4", { each: true })
  @Field(() => [ID], { defaultValue: [] })
  parents: string[];

  @IsUUID("4", { each: true })
  @Field(() => [ID], { defaultValue: [] })
  subjects: string[];
}
