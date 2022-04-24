import React from "react";
import { ScheduleLesson } from "../../../../../modules/schedule/types/ScheduleLesson";
import {useStore} from "effector-react";
import {timetableStore} from "../../../../../modules/effector/TimetableStore";
import styles from "../../Components.module.scss"
import Typography from "@mui/material/Typography";

type ILesson = {
    lesson: ScheduleLesson | undefined,
}

const Lesson = ({lesson}: ILesson) => {
    const {isTeacher} = useStore(timetableStore);

    return (
        <>
            {lesson ? (
                <>
                    <div className={styles.stick}/>
                    <div className={styles.lesson}>
                        <Typography >{lesson?.subject}</Typography>
                        <Typography >{isTeacher ? lesson?.group : lesson?.teacher.split(" ")[0]} {lesson?.auditory}</Typography>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.stick}/>
                    <div className={styles.lesson}>
                        <Typography >—</Typography>
                    </div>
                </>
            )}
        </>
    );
}

export default Lesson;