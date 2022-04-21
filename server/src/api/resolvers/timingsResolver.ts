import "reflect-metadata";
import { Arg, Query, Resolver } from "type-graphql";
import { lessonsTimings } from "../../dataGetters/getEatTimings";
import eatTimingsCache from "../caches/timingsCache";
import EatTimings from "../types/eatTimings";
import Timing from "../types/timing";

@Resolver()
export default class TimingsResolver {
    @Query(returns => EatTimings, {nullable: true})
    getEatTimings(
        @Arg("class") className: string
    ): EatTimings | undefined {
        return eatTimingsCache().get(className);
    }

    @Query(returns => [Timing])
    getLessonsTimings() {
        return lessonsTimings;
    }
}