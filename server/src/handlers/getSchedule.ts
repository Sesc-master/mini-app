import buildHandler from "../helpers/BuildHandler";
import httpsRequest from "../helpers/HttpsRequest";

type IdableScheduleType = "group" | "teacher" | "auditory";

const server = "lyceum.urfu.ru";
const timeout = 800;
const methodType = 11;

export interface ScheduleArgs {
    id: number,
    weekday: number,
    type: IdableScheduleType
}

export async function getSchedule(args: ScheduleArgs) {
    let url = new URL(`http://${server}/`);
    url.searchParams.append("type", String(methodType));
    url.searchParams.append("scheduleType", args.type);
    url.searchParams.append("weekday", String(args.weekday));
    url.searchParams.append(args.type, String(args.id));

    return httpsRequest({
        hostname: server,
        timeout: timeout,
        path: url.toString(),
        headers: { host: server }
    }).then(response => JSON.parse(response.body));
}

export default buildHandler(getSchedule);