import getEatTimings, { ClassesEatTimings } from "../../dataGetters/getEatTimings";

var eatTimingsCache: ClassesEatTimings = new Map();

export async function updateEatTimingsCache() {
    let newEatTimings = await getEatTimings();
    if (newEatTimings !== eatTimingsCache && newEatTimings) {
        eatTimingsCache = newEatTimings;
    }
}

updateEatTimingsCache();
export const eatTimingsCacheUpdateTimer = setInterval(updateEatTimingsCache, 1000 * 60 * 60 * 24 * 20);

export default () => eatTimingsCache;