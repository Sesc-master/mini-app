import { NextApiRequest, NextApiResponse } from "next";
import httpsRequest from "../../../src/APIModules/HttpsRequest";

const server = "lyceum.urfu.ru";
const timeout = 750;
const methodType = 11;
const scheduleType = "all"

export interface IGetFullScheduleArgs {
    weekday: number
}

export default async function getFullSchedule(req: NextApiRequest, res: NextApiResponse) {
    let args: IGetFullScheduleArgs = JSON.parse(req.body);
    
    let url = new URL("/");
    url.searchParams.append("type", String(methodType));
    url.searchParams.append("scheduleType", "all");
    url.searchParams.append("weekday", String(args.weekday));

    return httpsRequest({
        hostname: server,
        timeout: timeout,
        path: url.pathname
    });
}