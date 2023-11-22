import { ObjectType, Field, ID } from '@nestjs/graphql';

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

  @Field()
  subjects:string;

  @Field()
  parents:string;

  @Field()
  teachers:string;


}
