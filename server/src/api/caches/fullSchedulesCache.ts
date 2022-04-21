import getFullSchedule from "../../dataGetters/getFullSchedule";
import { ParsedIDs } from "../../dataGetters/getIDs";
import BaseLesson from "../types/baseSchedule";

var fullSchedulesCache: Map<number, Map<string, Array<BaseLesson | false>>>;
export var freeAuditories: Map<number, Array<Array<string>>>;

function countWeekdayFreeAuditories(weekday: number, weekdayFullSchedule: Map<string, Array<BaseLesson | false>>) {
    let weekdayFreeAuditories = Array.from(Array(7), () => new Array<string>());
    weekdayFullSchedule.forEach((lessons, auditory) => {
        lessons.forEach((lesson, lessonIndex) => {
            if (lesson === false) weekdayFreeAuditories[lessonIndex].push(auditory);
        })
    });
    freeAuditories.set(weekday, weekdayFreeAuditories);
}

export async function updateFullSchedulesCache(IDs: ParsedIDs) {
    for (let weekday of IDs.weekday.values()) {
        let fullSchedule = await getFullSchedule(weekday);
        fullSchedulesCache.set(weekday, fullSchedule);
        countWeekdayFreeAuditories(weekday, fullSchedule);
        setInterval(async () => {
            let newFullSchedule = await getFullSchedule(weekday);
            if (fullSchedulesCache.get(weekday) !== newFullSchedule) {
                fullSchedulesCache.set(weekday, newFullSchedule);
                countWeekdayFreeAuditories(weekday, newFullSchedule);
            }
        }, 1000 * 60 * 60);
    }
}

fullSchedulesCache = new Map();
freeAuditories = new Map();

export default () => fullSchedulesCache;