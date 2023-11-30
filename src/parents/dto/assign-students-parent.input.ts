import { Field, ID, InputType } from "@nestjs/graphql";
import { IsUUID } from "class-validator";


@InputType()
export class AssignStudentsToParentInput{
    @IsUUID()
    @Field(type => ID)
    parentId: string;

    @IsUUID("4", {each: true})
    @Field(type => [ID])
    studentIds: string[];
}