import { Field, ObjectType } from "type-graphql";
import EatTiming from "./eatTiming"

@ObjectType()
export default class EatTimings {
    @Field()
    breakfast!: EatTiming;
    @Field()
    dinner!: EatTiming;
    @Field()
    afternoonSnack!: EatTiming;
}