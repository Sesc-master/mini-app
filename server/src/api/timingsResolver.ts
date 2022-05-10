import "reflect-metadata";
import { Arg, Query, Resolver } from "type-graphql";
import { lessonsTimings } from "../sesc/sescAPI/getEatTimings";
import eatTimingsCache from "../sesc/sescCache/caches/timingsCache";
import EatTimings from "./types/eatTimings";
import Timing from "./types/timing";

@Resolver()
export default class TimingsResolver {
    @Query(returns => EatTimings, {nullable: true})
    async getEatTimings(
        @Arg("class") className: string
    ): Promise<EatTimings | undefined> {
        return (await eatTimingsCache())[className];
    }

    @Query(returns => [Timing])
    getLessonsTimings() {
        return lessonsTimings;
    }
}