import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";


@InputType()
export class AssignSubjectToTeacherInput{
    @IsUUID()
    @Field(type => ID)
    teacherId: string;

    @IsUUID("4", {each: true})
    @Field(type => [ID])
    subjectIds: string[];
}