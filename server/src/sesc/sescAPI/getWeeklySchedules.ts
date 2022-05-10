import { ParsedIDs } from "./getIDs"
import getSchedule, {IdableScheduleTypeValues} from "./getSchedule";
import Schedule from "../../api/types/schedule";

export type IGetWeeklySchedules = {
    group: Map<any, any>,
    teacher: Map<any, any>,
    auditory: Map<any, any>
}

const awaiter = (() => {
    let queries = 0;
    const queriesLimit = 42;
    const queriesDelay = 1500;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    return async () => {
        if (queries >= queriesLimit){
            await delay(queriesDelay)
            queries = 0
            return
        }

        queries++
    }
})()

export async function getWeeklySchedules(IDs: ParsedIDs) : Promise<IGetWeeklySchedules> {
    const weeklySchedules = {
        group: new Map(),
        teacher: new Map(),
        auditory: new Map()
    }

    for (let type of IdableScheduleTypeValues){
        if (type === "auditory") continue;

        const idSchedule = new Map<number, Array<Schedule>>();
        for (let [name, ID] of IDs[type]){
            const weekdaySchedule = Array<Schedule>();
            for (let weekday of IDs.weekday.values()) {
                const schedule = await getSchedule(weekday, type, ID);
                weekdaySchedule.push(schedule)
                await awaiter()
            }
            idSchedule.set(ID, weekdaySchedule)
            console.log(name, ID)
        }
        weeklySchedules[type] = idSchedule
    }

    return weeklySchedules
}
