import {getWeeklySchedules} from "../sescAPI/getWeeklySchedules";
import getClassrooms from "../sescAPI/getClassrooms";
import {getLocalDay} from "../../utils/getToday";
import {CacheKey} from "./cacheKey";
import getEatTimings from "../sescAPI/getEatTimings";
import getIDs from "../sescAPI/getIDs";
import { updateKeyValue } from "./updateKeyValue"

const updateWeeklySchedules = async () => {
    const ids = await getIDs();

    if (ids){
        await updateKeyValue(CacheKey.WeeklySchedules, () => getWeeklySchedules(ids));
    }
}

export const updateCache = async () => {

    await Promise.all([
        updateKeyValue(CacheKey.IDs, getIDs),
        updateKeyValue(CacheKey.Timings, getEatTimings),
        updateKeyValue(CacheKey.Classrooms, () => getClassrooms(getLocalDay())),
        updateWeeklySchedules(),
    ])
}