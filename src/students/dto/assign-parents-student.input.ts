import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";


@InputType()
export class AssignParentsToStudentInput{
    @IsUUID()
    @Field(type => ID)
    studentId: string;

    @IsUUID("4", {each: true})
    @Field(type => [ID])
    parentIds: string[];
}