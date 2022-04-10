import reviver from "../JSONReviver"

export type ParsedIDs = {
    groups: Map<string, number>;
    teachers: Map<string, number>;
    auditories: Map<string, number>;
    weekdays: Map<string, number>;
}

export default async function getIDs(): Promise<ParsedIDs> {
    return fetch("/api/sesc/getIDs").then(response => response.text()).then(text =>
        JSON.parse(text, reviver([["groups", "teachers", "auditories", "weekdays"]]))
    );
}
