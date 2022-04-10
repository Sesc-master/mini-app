import getIDs from "./GetIDs";
import {getSchedule} from "./Schedule";

export async function getWeekSchedule(key: string, isTeacher?: boolean) {
    const IDs = await getIDs();
    const type = isTeacher ? 'teacher' : 'group';
    const id = isTeacher ? Number(IDs.teachers.get(key)) : Number(IDs.groups.get(key))

    return await Promise.all(Array.from({length: 6}, (_, dayIndex) => {
        return getSchedule(type, dayIndex + 1, id)
            .catch(() => {
                return undefined
            })
    }));
}