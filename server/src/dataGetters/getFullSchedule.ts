import BaseLesson from "../api/types/baseSchedule";
import reviver from "../helpers/JSONReviver";
import SESCRequest from "../helpers/SESCRequest";

const server = "lyceum.urfu.ru";
const timeout = 8000;
const methodType = 11;
const scheduleType = "all"

export default async function getFullSchedule(weekday: number): Promise<Map<string, Array<false | BaseLesson>>> {
    let url = new URL(`http://${server}/`);
    url.searchParams.append("type", String(methodType));
    url.searchParams.append("scheduleType", scheduleType);
    url.searchParams.append("weekday", String(weekday));

    return SESCRequest({
        hostname: server,
        timeout: timeout,
        path: url.pathname + "?" + url.searchParams.toString(),
        headers: { host: server }
    }).then(response => JSON.parse(response.body, reviver([["subject", "teacher", "group"]])).get("auditories"));
}