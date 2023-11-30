import { ObjectType, Field, ID } from '@nestjs/graphql';
import { StudentType } from 'src/students/entities/student.type';

@ObjectType("parent")
export class ParentType {
  @Field(type => ID)
  id: string;

  @Field()
  firstName:string;

  @Field()
  lastName:string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field(type => [StudentType])
  children: string[];

}
