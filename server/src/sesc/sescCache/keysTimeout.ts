import {CacheKey} from "./cacheKey";

export const keysTimeout = {
    [CacheKey.Timings]: 60 * 60 * 24 * 24,
    [CacheKey.IDs]: 60 * 60 * 24 * 24,
    [CacheKey.Classrooms]: 60 * 60 * 2,
    [CacheKey.WeeklySchedules]: 60 * 60 * 2,
    defaultTimeoutMs: 1000 * 60 * 60,
    ttlAfterTimeout: 60 * 60 * 40,
}