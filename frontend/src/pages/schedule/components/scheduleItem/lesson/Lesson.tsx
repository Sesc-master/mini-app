import React from "react";
import {Text} from "@vkontakte/vkui";
import { ScheduleLesson } from "../../../../../modules/schedule/types/ScheduleLesson";
import {useStore} from "effector-react";
import {timetableStore} from "../../../../../modules/effector/TimetableStore";
import styles from "../../Components.module.scss"

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
                        <Text weight="semibold">{lesson?.subject}</Text>
                        <Text weight="regular">{isTeacher ? lesson?.group : lesson?.teacher.split(" ")[0]} {lesson?.auditory}</Text>
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.stick}/>
                    <div className={styles.lesson}>
                        <Text weight="semibold">—</Text>
                    </div>
                </>
            )}
        </>
    );
}

export default Lesson;