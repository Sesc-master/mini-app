import getIDs from "./GetIDs";
import {getFullSchedule, getSchedule} from "./Schedule";
import {IdableScheduleType, Schedule} from "./schedule/Schedule";

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

    public static async getTableForWeek(key: string, isTeacher?: boolean) {
        const IDs = await getIDs();
        const type = isTeacher ? 'teacher' : 'group';
        const id = isTeacher ? Number(IDs.teachers.get(key)) : Number(IDs.groups.get(key))

        return await Promise.all(Array.from({length: 6}, (_, dayIndex) => {
            return getSchedule(type, dayIndex + 1, id)
                .catch(() => {
                    return undefined
                })
        }));
    }
}