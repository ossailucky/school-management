import { ObjectType, Field, ID } from '@nestjs/graphql';
import { UserType } from 'src/user/entities/user.type';

@ObjectType("classroom")
export class ClassRoomType {
    @Field(type => ID)
    id: string;

    @Field()
    className: string;

    @Field()
    classSubjects:string;
    
    @Field(type => [UserType])
    students:string[];
}