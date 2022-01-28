import buildHandler from "../../../src/APIModules/BuildHandler";
import httpsRequest from "../../../src/APIModules/HttpsRequest";
import { IdableScheduleType } from "../../../src/Modules/Schedule/Schedule";

const server = "lyceum.urfu.ru";
const timeout = 750;
const methodType = 11;

export interface IGetScheduleArgs {
    id: number,
    weekday: number,
    type: IdableScheduleType
}

export async function getSchedule(args: IGetScheduleArgs) {
    let url = new URL(`http://${server}/`);
    url.searchParams.append("type", String(methodType));
    url.searchParams.append("scheduleType", args.type);
    url.searchParams.append("weekday", String(args.weekday));
    url.searchParams.append(args.type, String(args.id));

    return httpsRequest({
        hostname: server,
        timeout: timeout,
        path: url.pathname + "?" + url.searchParams.toString(),
        headers: { host: server }
    }).then(response => JSON.parse(response.body));
}

export default buildHandler(getSchedule);