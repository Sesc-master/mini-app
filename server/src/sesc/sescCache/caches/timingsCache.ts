import {get} from "../../../database";
import {CacheKey} from "../cacheKey";

export default async () => JSON.parse(await get(CacheKey.Timings) || "{}")