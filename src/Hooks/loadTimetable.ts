import {Table} from "../Modules/Table"
import {
    setWeekSchedule, 
    setIsTimetableLoading,
    setIsError,
} from '../Modules/Effector/TimetableStore'

const memorizeGrade = (grade: string) => {
    localStorage.setItem('grade', grade)
}

export const loadTimetable = async (grade: string) => {
    try {
        memorizeGrade(grade)

        setIsTimetableLoading(true)
        setIsError(false)

        const weekSchedule = await Table.getTableForWeek(grade)
        setWeekSchedule(weekSchedule)

        setIsTimetableLoading(false)
    }catch {
        setIsError(true)
        setIsTimetableLoading(false)
    }
}
