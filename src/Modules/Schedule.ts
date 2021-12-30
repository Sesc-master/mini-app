import request from "../Modules/AllOriginsProxy";
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

export async function getFullSchedule(weekday: number) {
    return APIRequest("all", weekday)
        .then(APIResponse => {
            let result = new FullSсhedule();
            if (APIResponse.auditories) {
                //Convert object in parsed json to map
                result.auditories = new Map(Object.keys(APIResponse.auditories).map(auditory => [
                    auditory, APIResponse.auditories[auditory]
                ]));
            }
            return result;
        })
}

export async function getSchedule(scheduleType: IdableScheduleType, weekday: number, id: number) {
    console.log((await getFullSchedule(weekday)).getFreeAuditories())
    return APIRequest(scheduleType, weekday, id)
        .then(scheduleFromJSON);
}