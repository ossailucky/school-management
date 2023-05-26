import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType("classroom")
export class ClassRoomType {
    @Field(type => ID)
    id: string;
    @Field()
    className: string;
    @Field()
    classSubjects:string;
    @Field()
    students:string;
}