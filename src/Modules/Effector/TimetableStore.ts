import {createEvent, createStore} from "effector";
import { isError } from "util";

export const setGrade = createEvent<string>()
export const setIsTimetableLoading = createEvent<boolean>()
export const setWeekSchedule = createEvent<Array<any>>()
export const setIsError = createEvent<boolean>()

export type ITimtabelStore = {
    grade: string,
    isTimetableLoading: boolean,
    weekSchedule: Array<any>,
    isError: boolean
}

export const timetableStore = createStore<ITimtabelStore>({
    grade: '',
    isTimetableLoading: false,
    weekSchedule: [],
    isError: false
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