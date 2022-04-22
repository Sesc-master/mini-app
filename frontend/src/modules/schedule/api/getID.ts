import { IdableScheduleType } from "../types/Schedule";

export default async function (type: IdableScheduleType, name: string): Promise<number> {
    return fetch("/graphql", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({query: `{ getID(type: "${type}", name: "${name}") }`})
    })
        .then(response => response.json())
        .then(response => response.data.getID);
}