import reviver from "../APIModules/JSONReviver";
import request from "./ProxyModule";
import { FullSсhedule } from "./Schedule/FullSchedule";
import { IdableScheduleType, Schedule, ScheduleType } from "./Schedule/Schedule";

const type = 11;
const server = "lyceum.urfu.ru"

async function APIRequest(scheduleType: ScheduleType, weekday: number, id?: number) {
    let url = new URL(`https://${server}`);
    url.searchParams.append("weekday", String(weekday));
    url.searchParams.append("scheduleType", scheduleType);
    url.searchParams.append("type", String(type));
    if (scheduleType !== "all") {
        url.searchParams.append(scheduleType, String(id))
    }
    return request(url.toString())
        .then(response => {
            return response.json();
        })
}

function scheduleFromJSON(parsedJSON: JSON | any) {
    let result = new Schedule();
    Object.assign(result, parsedJSON);
    return result;
}

export async function getFullSchedule(weekday: number): Promise<FullSсhedule> {
    return fetch("/api/sesc/getSchedule", {
        body: JSON.stringify({weekday}),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    }).then(response => response.text()).then(text =>  {
        let apiObject = JSON.parse(text, reviver([["auditories"]]));
        let result = new FullSсhedule();
        result.auditories = apiObject.auditories;
        return result;
    });
}

export async function getFreeAuditories(weekday: number) {
    return getFullSchedule(weekday).then(fullSchedule => fullSchedule.getFreeAuditories());
}

export async function getSchedule(type: IdableScheduleType, weekday: number, id: number): Promise<Schedule> {
    return fetch("/api/sesc/getSchedule", {
        body: JSON.stringify({type, weekday, id}),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    }).then(response => response.text()).then(text => 
        JSON.parse(text, reviver([["type", "lessons", "diffs"], ["subject", "teacher", "group"]]))
    );
}

