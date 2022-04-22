import getIDs, { ParsedIDs } from "../../dataGetters/getIDs";
import { updateFullSchedulesCache } from "./fullSchedulesCache";
import { updateSchedulesCache } from "./schedulesCache";

var IDsCache: ParsedIDs = {
    group: new Map(),
    teacher: new Map(),
    auditory: new Map(),
    weekday: new Map()
};

export async function updateIDsCache() {
    let newIDs = await getIDs();
    if (newIDs !== IDsCache && newIDs) {
        IDsCache = newIDs;
        updateSchedulesCache(newIDs);
        updateFullSchedulesCache(newIDs);
    }
}

export default () => IDsCache;

updateIDsCache();
export const IDsCacheUpdateTimer = setInterval(updateIDsCache, 1000 * 60 * 60 * 24);