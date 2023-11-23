import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType("studentAuth")
export class StudentAuthType {
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

    @Field()
    studentClass:string;

    @Field()
    access_token: string;
  
  }
