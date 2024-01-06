import { ObjectType, Field, ID } from '@nestjs/graphql';


@ObjectType("schedule")
export class ScheduleType {
    @Field(type => ID)
    id: string;

    @Field()
    eventName: string;

    @Field()
    eventDescription: string;

    @Field(()=> [Date])
    eventDate: Date[];

    
}