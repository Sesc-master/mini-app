import reviver from "../APIModules/JSONReviver";
import { FullSchedule } from "./Schedule/FullSchedule";
import { IdableScheduleType, Schedule } from "./Schedule/Schedule";

export async function getFullSchedule(weekday: number): Promise<FullSchedule> {
    return fetch("/api/sesc/getFullSchedule", {
        body: JSON.stringify({weekday}),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    }).then(response => response.text()).then(text =>  {
        let apiObject = JSON.parse(text, reviver([["auditories"]]));
        let result = new FullSchedule();
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

