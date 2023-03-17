import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType("user")
export class UserType {
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

}
