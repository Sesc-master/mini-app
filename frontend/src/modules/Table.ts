import GetID from "./GetID";
import {getSchedule} from "./Schedule";
import {IdableScheduleType, Schedule} from "./schedule/Schedule";

export class Table {
    static teachers: any;
    static auditories: any;

    public static async getTable(scheduleType: IdableScheduleType, weekday: number, grade: string): Promise<Schedule> {
        return GetID(scheduleType, grade).then(ID => getSchedule(scheduleType, weekday, ID));
    }

    public static async getTableForWeek(key: string, isTeacher?: boolean) {
        const type = isTeacher ? 'teacher' : 'group';
        const id = await GetID(type, key);

        return await Promise.all(Array.from({length: 6}, (_, dayIndex) => {
            return getSchedule(type, dayIndex + 1, id)
                .catch(() => {
                    return undefined
                })
        }));
    }
}