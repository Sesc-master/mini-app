import { resolve } from "path/posix";
import getIDs from "./GetIDs";
import { getSchedule, getFullSchedule } from "./Schedule";
import { IdableScheduleType, Schedule } from "./Schedule/Schedule";

export class Table {
    static teachers: any;
    static auditories: any;

    public static async getTable(scheduleType: IdableScheduleType, weekday: number, grade: string): Promise<Schedule> {
        return getIDs().then(IDs => {
            switch (scheduleType) {
                case "group":
                    return getSchedule(scheduleType, weekday, Number(IDs.groups.get(grade)));
                case "teacher":
                    return getSchedule(scheduleType, weekday, Number(IDs.teachers.get(grade)));
                case "auditory":
                    return getSchedule(scheduleType, weekday, Number(IDs.auditories.get(grade)));
            }
        });
    }

    public static getFullTable(weekday: number) {
        return getFullSchedule(weekday)
    }

    public static async getTableForWeek(grade: string) {
        const IDs = await getIDs();


        const schedule = await Promise.all(Array.from({length: 6}, (_, dayIndex) => {
            return getSchedule("group", dayIndex + 1, Number(IDs.groups.get(grade)))
                    .catch(() => {
                        return undefined
                    })
        }));

        return schedule;
    }
}