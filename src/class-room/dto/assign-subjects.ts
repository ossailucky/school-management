import { Field, ID, InputType } from "@nestjs/graphql";
import { IsOptional, IsUUID } from "class-validator";


@InputType()
export class AssignSubjectClass{
    @IsUUID()
    @Field(type => ID)
    classId: string;

    @IsOptional()
    @IsUUID("4", {each: true})
    @Field(type => [ID])
    subjectIds: string[];

    
}