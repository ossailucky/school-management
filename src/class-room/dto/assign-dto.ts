import { Field, ID, InputType } from "@nestjs/graphql";
import { IsOptional, IsUUID } from "class-validator";


@InputType()
export class AssignClassRoom{
    @IsUUID()
    @Field(type => ID)
    classId: string;

    @IsOptional()
    @IsUUID("4", {each: true})
    @Field(type => [ID])
    studentIds: string[];

    @IsOptional()
    @Field(type => [String],{nullable: true })
    classSubjects: string[];
}