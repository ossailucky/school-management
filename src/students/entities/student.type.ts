import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ParentType } from 'src/parents/entities/parent.type';
import { SubjectType } from 'src/subject/entities/subject.type';

@ObjectType("student")
export class StudentType {
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

//   @Field()
//   DOB: Date;

  @Field()
  studentClass:string;

  @Field(type => [SubjectType])
  subjects:string[];

  @Field(type => [ParentType])
  parents:string[];

  @Field()
  teachers:string;


}
