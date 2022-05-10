import { setTTL } from "../../database/";
import {CacheKey} from "./cacheKey";
import {keysTimeout} from "./keysTimeout";

export const setKeyTimeout = async (key: CacheKey) => {
    await setTTL(key, keysTimeout[key] + keysTimeout.ttlAfterTimeout)
}