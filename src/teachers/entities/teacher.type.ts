import { ObjectType, Field, ID } from '@nestjs/graphql';

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

  @Field()
  subjects:string;

}
