import {getWeeklySchedules} from "../sescAPI/getWeeklySchedules";
import getIDs from "../sescAPI/getIDs";
import getClassrooms from "../sescAPI/getClassrooms";
import {getLocalDay} from "../../utils/getToday";
import {CacheKey} from "./cacheKey";
import {set} from "../../database";
import getEatTimings from "../sescAPI/getEatTimings";
import replacer from "../../utils/JSONReplacer";
import {setKeyTimeout} from "./setKeyTimeout";

export const setCache = async () => {
    const ids = await getIDs();
    const classrooms = await getClassrooms(getLocalDay());
    const weeklySchedules = ids ? await getWeeklySchedules(ids) : undefined;
    const eatTimings = await getEatTimings();

    await Promise.all(
        [
            set(CacheKey.IDs, JSON.stringify(ids, replacer)),
            set(CacheKey.Classrooms, JSON.stringify(classrooms, replacer)),
            set(CacheKey.WeeklySchedules, JSON.stringify(weeklySchedules, replacer)),
            set(CacheKey.Timings, JSON.stringify(eatTimings))
        ]);

    await Promise.all(
        [
            setKeyTimeout(CacheKey.IDs),
            setKeyTimeout(CacheKey.Classrooms),
            setKeyTimeout(CacheKey.WeeklySchedules),
            setKeyTimeout(CacheKey.Timings),
        ]);
}