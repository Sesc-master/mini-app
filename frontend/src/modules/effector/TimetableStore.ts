import {createEvent, createStore} from "effector";

export const setGrade = createEvent<string>()
export const setIsTimetableLoading = createEvent<boolean>()
export const setWeekSchedule = createEvent<Array<any>>()
export const setIsError = createEvent<boolean>()
export const setIsTeacher = createEvent<boolean>()
export const setTeacher = createEvent<string>()
export const setDay = createEvent<number>()

export type ITimtabelStore = {
    grade: string,
    isTimetableLoading: boolean,
    weekSchedule: Array<any>,
    isError: boolean,
    isTeacher: boolean,
    teacher: string,
    day: number
}

export const timetableStore = createStore<ITimtabelStore>({
    isTimetableLoading: false,
    weekSchedule: [],
    isError: false,
    isTeacher: false,
    teacher: '',
    grade: "",
    day: 0,
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
    .on(setDay, (state, day) => (
        {...state, day}
    ))