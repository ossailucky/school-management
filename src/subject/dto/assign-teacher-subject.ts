import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";


@InputType()
export class AssignTeacherToSubjectInput{
    @IsUUID()
    @Field(type => ID)
    subjectId: string;

    @IsUUID("4", {each: true})
    @Field(type => [ID])
    teacherIds: string[];
}