import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class Timing {
    @Field()
    startTime!: string;
    @Field()
    endTime!: string;
}