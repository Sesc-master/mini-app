import buildHandler from "../helpers/BuildHandler";
import axios from "axios";

const server = "lyceum.urfu.ru";
const timeout = 1000;
const methodType = 11;
const scheduleType = "all"

export interface IGetFullScheduleArgs {
    weekday: number
}

export async function getFullSchedule(args: IGetFullScheduleArgs) {
    let url = new URL(`https://${server}/`);
    url.searchParams.append("type", String(methodType));
    url.searchParams.append("scheduleType", scheduleType);
    url.searchParams.append("weekday", String(args.weekday));

    const response = await axios({
        url: url.toString(),
        headers: {host: server},
        timeout
    });

    return response.data;
}


export default buildHandler(getFullSchedule);
