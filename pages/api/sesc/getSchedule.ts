import { NextApiRequest, NextApiResponse } from "next";
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

export default async function getSchedule(req: NextApiRequest, res: NextApiResponse) {
    let args: IGetScheduleArgs = JSON.parse(req.body);

    let url = new URL("/");
    url.searchParams.append("type", String(methodType));
    url.searchParams.append("scheduleType", args.type);
    url.searchParams.append("weekday", String(args.weekday));
    url.searchParams.append(args.type, String(args.id));

    return httpsRequest({
        hostname: server,
        timeout: timeout,
        path: url.pathname
    });
}