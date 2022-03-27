import {Table} from "../modules/Table"
import {
    setWeekSchedule, 
    setIsTimetableLoading,
    setIsError,
} from '../modules/effector/TimetableStore'
import {StorageKey} from "../modules/StorageKey";

export const useLoadTimetable = async (grade: string, teacher: string, isTeacher: boolean = false) => {
    try {
        localStorage.setItem(StorageKey.Timetable ,JSON.stringify({grade, teacher, isTeacher}));

        const key = isTeacher ? teacher : grade;

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
