import buildHandler from "../helpers/BuildHandler";
import axios from "axios";

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
    let url = new URL(`https://${server}/`);
    url.searchParams.append("type", String(methodType));
    url.searchParams.append("scheduleType", args.type);
    url.searchParams.append("weekday", String(args.weekday));
    url.searchParams.append(args.type, String(args.id));

    const response = await axios({
        timeout,
        url: url.toString(),
        headers: { host: server }
    });

    return response.data;
}

export default buildHandler(getSchedule);