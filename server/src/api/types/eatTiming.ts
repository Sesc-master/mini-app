import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
export default class EatTiming {
    @Field()
    startTime!: string;
    @Field()
    endTime!: string;
    @Field(type => Int)
    afterLesson!: number;
}