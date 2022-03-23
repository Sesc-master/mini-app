import {Table} from "../Modules/Table"
import {
    setWeekSchedule, 
    setIsTimetableLoading,
    setIsError,
} from '../Modules/Effector/TimetableStore'
import {StorageKey} from "../Modules/StorageKey";

export const loadTimetable = async (key: string, isTeacher: boolean = false) => {
    try {
        localStorage.setItem(StorageKey.Timetable ,JSON.stringify({key, isTeacher}));

        setIsTimetableLoading(true)
        setIsError(false)

        const weekSchedule = await Table.getTableForWeek(key, isTeacher)
        setWeekSchedule(weekSchedule)

        setIsTimetableLoading(false)
    }catch {
        setIsError(true)
        setIsTimetableLoading(false)
    }
}
