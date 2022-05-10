import Schedule from "../../api/types/schedule";
import SESCRequest from "../../utils/SESCRequest";

export type IdableScheduleType = "group" | "teacher" | "auditory";
export const IdableScheduleTypeValues : Array<IdableScheduleType> = ["group", "teacher", "auditory"];

const server = "lyceum.urfu.ru";
const timeout = 15000;
const methodType = 11;

export default async function getSchedule(weekday: number, type: IdableScheduleType, ID: number): Promise<Schedule> {
    let url = new URL(`https://${server}/`);
    url.searchParams.append("type", String(methodType));
    url.searchParams.append("scheduleType", String(type));
    url.searchParams.append("weekday", String(weekday));
    url.searchParams.append(type, String(ID));

    let req = SESCRequest({
        host: server,
        timeout: timeout,
        path: url.pathname + url.search.toString(),
        //headers: {Host: server}
    });
    req.catch(e => console.log(e));
    return req.then(response => JSON.parse(response.body));
}