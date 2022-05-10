import {get} from "../../../database";
import {CacheKey} from "../cacheKey";

export default async () => {
    return JSON.parse(await get(CacheKey.IDs) || "{}");
}

