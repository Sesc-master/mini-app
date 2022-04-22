import getFullSchedule from "../../dataGetters/getFullSchedule";
import { ParsedIDs } from "../../dataGetters/getIDs"
import getSchedule, { IdableScheduleType } from "../../dataGetters/getSchedule";
import BaseLesson from "../types/baseSchedule";
import Schedule from "../types/schedule";

const queriesLimit = 42;
const queriesDelay = 1500;
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const scheduleExpireInterval = 1000 * 60 * 60;


var schedulesCache: Record<IdableScheduleType, Map<number, Map<number, Schedule>>>;

export async function updateSchedulesCache(IDs: ParsedIDs) {
    let queries = 0;
    let requests = Array<Promise<Schedule>>();
    for (let [scheduleType, scheduleTypeIDs] of Object.entries(IDs) as Array<[keyof ParsedIDs, Map<string, number>]>) {
        if (scheduleType !== "weekday") {
            let scheduleMap = new Map<number, Map<number, Schedule>>();
            for (let weekday of IDs.weekday.values()) {
                let weekdayCache = new Map<number, Schedule>();
                for (let [name, ID] of scheduleTypeIDs) {
                    if (queries >= queriesLimit) {
                        await delay(queriesDelay);
                        queries = 0;
                    }
                    queries++;
                    let request = getSchedule(weekday, scheduleType, ID);

                    request.then(schedule => {
                        weekdayCache.set(ID, schedule)
                        setInterval(async () => {
                            console.log(`expired schedule ${scheduleType} cache for: ${ID} in day: ${weekday}`);
                            if (queries >= queriesLimit) {
                                await delay(queriesDelay);
                                queries = 0;
                            }
                            queries++;
                            let newSchedule = await getSchedule(weekday, scheduleType as IdableScheduleType, ID);
                            if (newSchedule !== weekdayCache.get(ID)) {
                                console.log(`edited schedule ${scheduleType} cache for: ${ID} in day: ${weekday}`);
                                console.log(`old ${weekdayCache.get(ID)}`);
                                console.log(`new: ${newSchedule}`);
                                weekdayCache.set(ID, newSchedule);
                                //TODO: recive new schedule to subcribers
                            }
                        }, scheduleExpireInterval);
                    });
                    requests.push(request);
                    queries++;
                }
                scheduleMap.set(weekday, weekdayCache);
            }
            schedulesCache[scheduleType] = scheduleMap;
        }
    }

    await Promise.all(requests);
    console.log("Schedule cache filled");
}

schedulesCache = {
    group: new Map(),
    teacher: new Map(),
    auditory: new Map()
}

export default () => schedulesCache;