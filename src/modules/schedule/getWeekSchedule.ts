import getIDs from "./api/getIDs";
import {getSchedule} from "./api/Schedule";

export async function getWeekSchedule(key: string, isTeacher?: boolean) {
    const type = isTeacher ? 'teacher' : 'group';
    const id = isTeacher ? (await getIDs())?.teachers.get(key) :
        (await getIDs())?.groups.get(key);

    if (!type || !id) throw new Error();

    return await Promise.all(Array.from({length: 6}, (_, dayIndex) => {
        return getSchedule(dayIndex + 1, type, id)
            .catch(() => {
                return undefined;
            })
    }));
}