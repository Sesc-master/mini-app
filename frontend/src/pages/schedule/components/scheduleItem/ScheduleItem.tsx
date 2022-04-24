import React from "react";
import {TimetableElement} from "../../../../modules/schedule/format";
import Lesson from "./lesson/Lesson";
import styles from "../Components.module.scss"
import Typography from "@mui/material/Typography";

type IScheduleItem = {
    time : string [], 
    schedule: TimetableElement
}

const ScheduleItem = ({time, schedule}: IScheduleItem) => {
    if (schedule.isCommonLesson === true || schedule.isCommonLesson === undefined){
        return (
            <div className={styles.task}>
                <div className={styles.date}>
                    <Typography >
                        {time[0]}
                    </Typography>
                    <Typography >
                        {time[1]}	
                    </Typography>
                </div>
                <Lesson lesson={schedule.commonLesson}/>
            </div>)
    }
    else {
        let firstGroupLesson = schedule.firstGroupLesson
        let secondGroupLesson = schedule.secondGroupLesson
        return (
            <div className={styles.task}>
                <div className={styles.date}>
                    <Typography >
                        {time[0]}
                    </Typography>
                    <Typography >
                        {time[1]}	
                    </Typography>
                </div>
                <Lesson lesson={firstGroupLesson}/>
                <Lesson lesson={secondGroupLesson}/>
            </div>
        )
    }
}; 

export default ScheduleItem;