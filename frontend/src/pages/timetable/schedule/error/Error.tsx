import React from 'react';
import {useLoadTimetable} from "../../../../hooks/useLoadTimetable";
import {useStore} from "effector-react";
import {timetableStore} from "../../../../modules/effector/TimetableStore";
import CircledButton from "../../../../components/circledButton/CircledButton";
import styles from "./Error.module.scss"

const Error = () => {
    const {isTeacher, teacher, grade} = useStore(timetableStore);

    return (
        <div className={styles.container}>
            <div className={styles.text}>Что-то пошло не так...</div>
            <CircledButton handler={() => useLoadTimetable(grade, teacher, isTeacher)} text={"Перезагрузить"} />
        </div>
    );
};

export default Error;