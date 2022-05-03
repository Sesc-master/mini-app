import BaseLesson from "../types/BaseLesson";
import reviver from "../../JSONReviver";
import request from "../../capacitorRequest/request";

const server = "lyceum.urfu.ru";
const methodType = 11;
const scheduleType = "all"

export default async function getFullSchedule(weekday: number): Promise<Map<string, Array<false | BaseLesson>>> {
    let url = new URL(`https://${server}/`);
    url.searchParams.append("type", String(methodType));
    url.searchParams.append("scheduleType", scheduleType);
    url.searchParams.append("weekday", String(weekday));

    return request({
        method: "GET",
        url: url.toString(),
    }).then(({data}) => JSON.parse(data, reviver([["subject", "teacher", "group"]])).get("auditories"));
}