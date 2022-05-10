import {getTTL} from "../../database/";
import {CacheKey} from "./cacheKey";
import {keysTimeout} from "./keysTimeout";

export const shouldKeyUpdate = async (key: CacheKey) => {
    return Number(await getTTL(key)) <= keysTimeout.ttlAfterTimeout
}