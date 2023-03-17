import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType("auth")
export class AuthType {
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
    access_token: string;
  
  }
