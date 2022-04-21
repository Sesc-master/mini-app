import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class BaseLesson {
    @Field()
    subject!: string;
    @Field()
    teacher!: string;
    @Field()
    group!: string;
}