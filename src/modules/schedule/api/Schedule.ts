import reviver from "../../JSONReviver";
import { IdableScheduleType, Schedule } from "../types/Schedule";
import request from "../../capacitorRequest/request";

export async function getSchedule(weekday: number, type: IdableScheduleType, ID: number): Promise<Schedule> {
    let url = new URL(`https://lyceum.urfu.ru/`);
    url.searchParams.append("type", "11");
    url.searchParams.append("scheduleType", String(type));
    url.searchParams.append("weekday", String(weekday));
    url.searchParams.append(type, String(ID));

    return request({
        method: "GET",
        url: url.toString(),
        //headers: {Host: server}
    })
        .then(response => {
            console.log(response.data, typeof response.data)
            return JSON.parse(response.data)
        })
        .catch(e => console.log(e));
}