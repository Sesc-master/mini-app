import buildHandler from "../../../src/APIModules/BuildHandler";
import { IdableScheduleType } from "../../../src/Modules/Schedule/Schedule";
import SESCRequest from "../../../src/APIModules/SESCRequest";

const server = "lyceum.urfu.ru";
const timeout = 2000;
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

    return SESCRequest({
        hostname: server,
        timeout: timeout,
        path: url.toString(),
        headers: { host: server }
    }).then(response => JSON.parse(response.body));
}

export default buildHandler(getSchedule);