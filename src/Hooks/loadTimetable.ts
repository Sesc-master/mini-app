import {Table} from "../Modules/Table"
import {
    setWeekSchedule, 
    setIsTimetableLoading,
    setIsError,
} from '../Modules/Effector/TimetableStore'

const memorizeGrade = (grade: string) => {
    localStorage.setItem('grade', grade)
}

export const loadTimetable = async (key: string, isTeacher?: boolean) => {
    try {
        memorizeGrade(key)

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
