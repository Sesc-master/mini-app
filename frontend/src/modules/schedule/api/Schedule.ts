import reviver from "../../JSONReviver";
import { IdableScheduleType, Schedule } from "../types/Schedule";

export async function getFreeClassrooms(weekday: number) : Promise<Array<Array<string>>> {
    return fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({query: `{ getFreeClassrooms(weekday: ${weekday}) }`})
    })
        .then(response => response.text())
        .then(response => JSON.parse(response, reviver()).get("data").get("getFreeClassrooms"));
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
