import { useState, useEffect } from 'react';
import {useStore} from "effector-react";
import {Table} from "../Modules/Table"
import {
    setWeekSchedule, 
    setIsTimetableLoading
} from '../Modules/Effector/TimetableStore'

const memorizeGrade = (grade: string) => {
    localStorage.setItem('grade', grade)
}

export const loadTimetable = async (grade: string) => {
    memorizeGrade(grade)

    setIsTimetableLoading(true)

    const weekSchedule = await Table.getTableForWeek(grade)
    setWeekSchedule(weekSchedule)
    setIsTimetableLoading(false)
}
