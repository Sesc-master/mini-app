import {createEvent, createStore} from "effector";
import teachers from "../../Components/Panels/Teachers";

export const setGrade = createEvent<string>()
export const setIsTimetableLoading = createEvent<boolean>()
export const setWeekSchedule = createEvent<Array<any>>()
export const setIsError = createEvent<boolean>()
export const setIsTeacher = createEvent<boolean>()
export const setTeacher = createEvent<string>()

export type ITimtabelStore = {
    grade: string,
    isTimetableLoading: boolean,
    weekSchedule: Array<any>,
    isError: boolean,
    isTeacher: boolean,
    teacher: string
}

export const timetableStore = createStore<ITimtabelStore>({
    grade: '',
    isTimetableLoading: false,
    weekSchedule: [],
    isError: false,
    isTeacher: false,
    teacher: ''
})
    .on(setGrade, (state, grade) => (
        {...state, grade}
    ))
    .on(setIsTimetableLoading, (state, isTimetableLoading) => (
        {...state, isTimetableLoading}
    ))  
    .on(setWeekSchedule, (state, weekSchedule) => (
        {...state, weekSchedule}
    ))  
    .on(setIsError, (state, isError) => (
        {...state, isError}
    ))
    .on(setIsTeacher, (state, isTeacher) => (
        {...state, isTeacher}
    ))
    .on(setTeacher, (state, teacher) => (
        {...state, teacher}
    ))