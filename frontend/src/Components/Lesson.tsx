import React from "react";
import {Text} from "@vkontakte/vkui";
import { ScheduleLesson } from "../Modules/Schedule/ScheduleLesson";
import {useStore} from "effector-react";
import {timetableStore} from "../Modules/Effector/TimetableStore";
// import '../../public/Styles/Lesson.css'
  

// import '@vkontakte/vkui/dist/vkui.css';

type ILesson = {
    lesson: ScheduleLesson | undefined,
}

const Lesson = ({lesson}: ILesson) => {
    const {isTeacher} = useStore(timetableStore);

    if (lesson){
        const {subject, teacher, auditory, group} = lesson;
        return(
            <>
                <div className='stick'></div>
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
                <div className='stick'></div>
                <div className='lesson'>
                    <Text weight="semibold">—</Text>
                </div>
            </> 
        )
    }
}

export default Lesson;