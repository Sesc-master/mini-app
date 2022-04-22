import { Field, ObjectType } from "type-graphql";
import ScheduleLesson from "./scheduleLesson";

@ObjectType()
export default class Schedule {
    @Field()
    type!: string;
    @Field(type => [ScheduleLesson])
    lessons!: Array<ScheduleLesson>;
    @Field(type => [ScheduleLesson])
    diffs!: Array<ScheduleLesson>;
}