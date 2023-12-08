import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SubjectType } from 'src/subject/entities/subject.type';

@ObjectType("teacher")
export class TeacherType {
  @Field(type => ID)
  id: string;

  @Field()
  firstName:string;

  @Field()
  lastName:string;

  @Field()
  email: string;
  
//   @Field()
//   role: string;

  @Field()
  DOB:string;

  @Field()
  TeacherClass:string;

  @Field(type => [SubjectType])
  subjects:string[];

}
