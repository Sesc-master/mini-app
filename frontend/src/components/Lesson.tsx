import React from "react";
import {Text} from "@vkontakte/vkui";
import { ScheduleLesson } from "../modules/schedule/ScheduleLesson";
import {useStore} from "effector-react";
import {timetableStore} from "../modules/effector/TimetableStore";

type ILesson = {
    lesson: ScheduleLesson | undefined,
}

const Lesson = ({lesson}: ILesson) => {
    const {isTeacher} = useStore(timetableStore);

    if (lesson){
        const {subject, teacher, auditory, group} = lesson;
        return(
            <>
                <div className='stick'/>
                <div className='lesson'>
                    <Text weight="semibold">{subject}</Text>
                    <Text weight="regular">{isTeacher ? group : teacher.split(" ")[0]} {auditory}</Text>
                </div>
            </> 
        )
    }
    else {
        return(
            <>
                <div className='stick'/>
                <div className='lesson'>
                    <Text weight="semibold">—</Text>
                </div>
            </> 
        )
    }
}

export default Lesson;