import {get} from "../../../database";
import {CacheKey} from "../cacheKey";

export default async () => {
    return new Map(Object.entries(JSON.parse(await get(CacheKey.Classrooms) || "{}")));
}