import { Field, Int, ObjectType } from "type-graphql";
import BaseLesson from "./baseSchedule";

@ObjectType()
export default class ScheduleLesson extends BaseLesson {
    @Field(type => Int)
    uid!: number;
    @Field()
    auditory!: string;
    @Field(type => Int)
    subgroup!: number;
    @Field(type => Int)
    number!: number;
    @Field(type => Int)
    weekday!: number;
}
