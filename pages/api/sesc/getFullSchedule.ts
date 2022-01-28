import buildHandler from "../../../src/APIModules/BuildHandler";
import httpsRequest from "../../../src/APIModules/HttpsRequest";

const server = "lyceum.urfu.ru";
const timeout = 750;
const methodType = 11;
const scheduleType = "all"

export interface IGetFullScheduleArgs {
    weekday: number
}

export async function getFullSchedule(args: IGetFullScheduleArgs) {
    let url = new URL(`http://${server}/`);
    url.searchParams.append("type", String(methodType));
    url.searchParams.append("scheduleType", scheduleType);
    url.searchParams.append("weekday", String(args.weekday));

    return httpsRequest({
        hostname: server,
        timeout: timeout,
        path: url.pathname + "?" + url.searchParams.toString(),
        headers: { host: server }
    }).then(response => JSON.parse(response.body));
}

export default buildHandler(getFullSchedule);