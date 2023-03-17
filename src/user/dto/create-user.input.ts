import { InputType, Field } from '@nestjs/graphql';
import { MinLength, IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @MinLength(2)
  firstName: string;

  @Field()
  @IsNotEmpty()
  @MinLength(2)
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
