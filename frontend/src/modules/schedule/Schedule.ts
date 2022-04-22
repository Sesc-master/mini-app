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
    return fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({query: `{ getFreeAuditories(weekday: ${weekday}) }`})
    })
        .then(response => response.text())
        .then(response => JSON.parse(response, reviver()).get("data").get("getFreeAuditories"));
}

export async function getSchedule(type: IdableScheduleType, weekday: number, ID: number): Promise<Schedule> {
    return fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({query: `{ getSchedule(type: "${type}", ID: ${ID}, weekday: ${weekday}) {
            type,
            lessons { subject, teacher, group, uid, auditory, subgroup, number, weekday },
            diffs { subject, teacher, group, uid, auditory, subgroup, number, weekday }
        } }`})
    })
        .then(response => response.text())
        .then(response => JSON.parse(response, reviver([["type", "lessons", "diffs"], ["subject", "teacher", "group"]])).get("data").get("getSchedule"));
}
