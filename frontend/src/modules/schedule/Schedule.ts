import reviver from "../JSONReviver";
import { FullSchedule } from "./FullSchedule";
import { IdableScheduleType, Schedule } from "./types/Schedule";

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

export async function getFreeAuditories(weekday: number) : Promise<Array<Array<string>>> {
    return getFullSchedule(weekday).then(fullSchedule => fullSchedule.getFreeAuditories());
}

export async function getSchedule(type: IdableScheduleType, weekday: number, id: number): Promise<Schedule> {
    return fetch("/api/sesc/getSchedule", {
        body: JSON.stringify({type, weekday, id}),
        headers: { "Content-Type": "application/json" },
        method: "POST"
    })
        .then(response => {
            if (response.ok){
                return response.text();
            }
            throw new Error();
        })
        .then(text => {
            return JSON.parse(text,
                reviver([["type", "lessons", "diffs"], ["subject", "teacher", "group"]]));
        })
}

