import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SubjectType } from 'src/subject/entities/subject.type';
import { UserType } from 'src/user/entities/user.type';

@ObjectType("classroom")
export class ClassRoomType {
    @Field(type => ID)
    id: string;

    @Field()
    className: string;

    @Field(type => [SubjectType])
    classSubjects:[];
    
    @Field(type => [UserType])
    students:string[];
}