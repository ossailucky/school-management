import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ClassRoomType } from 'src/class-room/entities/class-room.type';
import { TeacherType } from 'src/teachers/entities/teacher.type';
import { UserType } from 'src/user/entities/user.type';

@ObjectType("subject")
export class SubjectType {
    @Field(type => ID)
    id: string;

    @Field()
    name: string;

    @Field(type => [ClassRoomType])
    className: string[];

    @Field(type => [TeacherType])
    teachers:string[];

    @Field(type => [UserType])
    students:string[];
}