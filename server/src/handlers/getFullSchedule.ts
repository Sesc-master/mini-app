import buildHandler from "../helpers/BuildHandler";
import axios from "axios";

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

    return axios({
        url: url.toString(),
        timeout: timeout,
        headers: { host: server }
    }).then(response => JSON.parse(response.data));
}

export default buildHandler(getFullSchedule);
