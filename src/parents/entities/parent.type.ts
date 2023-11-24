import { ObjectType, Field, ID } from '@nestjs/graphql';

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

  @Field()
  children:string;

}
