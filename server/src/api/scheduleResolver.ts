import "reflect-metadata";
import { Arg, Query, Resolver } from "type-graphql";
import { IdableScheduleType, IdableScheduleTypeValues } from "../sesc/sescAPI/getSchedule";
import { getFreeClassrooms } from "../sesc/sescAPI/getFreeClassrooms"
import schedulesCache from "../sesc/sescCache/caches/schedulesCache"
import Schedule from "./types/schedule";
import {getLocalDay} from "../utils/getToday";
import getClassrooms from "../sesc/sescAPI/getClassrooms";
import {get} from "../database/database";
import {CacheKey} from "../sesc/sescCache/cacheKey";
import getClassroomsCache from "../sesc/sescCache/caches/classroomsCache"

@Resolver()
export default class ScheduleResolver {

    @Query(type => Schedule, {nullable: true})
    async getSchedule(
        @Arg("type") scheduleType: IdableScheduleType,
        @Arg("weekday") weekday: number,
        @Arg("ID") ID: number
    ): Promise<Schedule | undefined> {
        if (IdableScheduleTypeValues.includes(scheduleType)) return (await schedulesCache())[scheduleType][ID][weekday - 1];
        else return undefined;
    }

    @Query(type => Schedule, {nullable: true})
    async getClassSchedule(
        @Arg("weekday") weekday: number,
        @Arg("ID") ID: number
    ): Promise<Schedule | undefined> {
        return await this.getSchedule("group", weekday, ID);
    }

    @Query(type => Schedule, {nullable: true})
    async getTeacherSchedule(
        @Arg("weekday") weekday: number,
        @Arg("ID") ID: number
    ): Promise<Schedule | undefined> {
        return await this.getSchedule("teacher", weekday, ID);
    }

    @Query(type => Schedule, {nullable: true})
    async getAuditorySchedule(
        @Arg("weekday") weekday: number,
        @Arg("ID") ID: number
    ): Promise<Schedule | undefined> {
        return await this.getSchedule("auditory", weekday, ID);
    }

    @Query(type => [[String]], {nullable: true})
    async getFreeClassrooms(
        @Arg("weekday") weekday: number,
    ): Promise<Array<Array<string>> | undefined> {
        const classrooms: any = await getClassroomsCache();
        return getFreeClassrooms(classrooms);
    }
}