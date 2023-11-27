import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType("teacherauth")
export class TeacherAuthType {
    @Field(type => ID)
    id: string;
    @Field()
    firstName:string;
    @Field()
    lastName:string;
    @Field()
    email: string;
    @Field()
    DOB: string;
    @Field()
    access_token: string;
  
  }
