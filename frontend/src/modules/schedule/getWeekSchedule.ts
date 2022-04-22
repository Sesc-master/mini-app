import getID from "./api/getID";
import {getSchedule} from "./api/Schedule";

export async function getWeekSchedule(key: string, isTeacher?: boolean) {
    const type = isTeacher ? 'teacher' : 'group';
    const id = await getID(type, key);

    return await Promise.all(Array.from({length: 6}, (_, dayIndex) => {
        return getSchedule(type, dayIndex + 1, id)
            .catch(() => {
                return undefined
            })
    }));
}