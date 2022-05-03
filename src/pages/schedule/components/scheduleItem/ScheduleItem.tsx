import React from "react";
import {TimetableElement} from "../../../../modules/schedule/format";
import Lesson from "./lesson/Lesson";
import styles from "../Components.module.scss"
import Time from "./time/Time";
import Paper from "@mui/material/Paper";

type IScheduleItem = {
    time : string [], 
    schedule: TimetableElement
}

const ScheduleItem = ({time, schedule}: IScheduleItem) => {
    if (schedule.isCommonLesson === true || schedule.isCommonLesson === undefined){
        return (
            <Paper className={styles.task}>
                <Time time={time}/>
                <Lesson lesson={schedule.commonLesson}/>
            </Paper>)
    }
    else {
        let firstGroupLesson = schedule.firstGroupLesson
        let secondGroupLesson = schedule.secondGroupLesson
        return (
            <Paper className={styles.task}>
                <Time time={time}/>
                <Lesson lesson={firstGroupLesson}/>
                <Lesson lesson={secondGroupLesson}/>
            </Paper>
        )
    }
};

export default ScheduleItem;
