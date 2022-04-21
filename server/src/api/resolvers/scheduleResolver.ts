import "reflect-metadata";
import { Arg, Query, Resolver } from "type-graphql";
import { IdableScheduleType, IdableScheduleTypeValues } from "../../dataGetters/getSchedule";
import { freeAuditories } from "../caches/fullSchedulesCache";
import schedulesCache from "../caches/schedulesCache";
import Schedule from "../types/schedule";

@Resolver()
export default class ScheduleResolver {

    @Query(type => Schedule, {nullable: true})
    getSchedule(
        @Arg("type") scheduleType: IdableScheduleType,
        @Arg("weekday") weekday: number,
        @Arg("ID") ID: number
    ): Schedule | undefined {
        if (IdableScheduleTypeValues.includes(scheduleType)) return schedulesCache()[scheduleType].get(weekday)?.get(ID);
        else return undefined;
    }

    @Query(type => Schedule, {nullable: true})
    getClassSchedule(
        @Arg("weekday") weekday: number,
        @Arg("ID") ID: number
    ): Schedule | undefined {
        return this.getSchedule("group", weekday, ID);
    }

    @Query(type => Schedule, {nullable: true})
    getTeacherSchedule(
        @Arg("weekday") weekday: number,
        @Arg("ID") ID: number
    ): Schedule | undefined {
        return this.getSchedule("teacher", weekday, ID);
    }

    @Query(type => Schedule, {nullable: true})
    getAuditorySchedule(
        @Arg("weekday") weekday: number,
        @Arg("ID") ID: number
    ): Schedule | undefined {
        return this.getSchedule("auditory", weekday, ID);
    }

    @Query(type => [[String]], {nullable: true})
    getFreeAuditories(
        @Arg("weekday") weekday: number,
    ): Array<Array<string>> | undefined {
        return freeAuditories.get(weekday);
    }
}