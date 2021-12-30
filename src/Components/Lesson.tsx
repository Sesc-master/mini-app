import React from 'react';
import {Text} from "@vkontakte/vkui";
import {SсheduleLesson} from '../Modules/Schedule'
import '../Styles/Lesson.css'
  

import '@vkontakte/vkui/dist/vkui.css';

type ILesson = {
    lesson: SсheduleLesson | undefined,
}

const Lesson = ({lesson}: ILesson) => {
    if (lesson){
        return(
            <>
                <div className='stick'></div>
                <div className='lesson'>
                    <Text weight="semibold">{lesson?.subject}</Text> 
                    <Text weight="regular">{lesson?.teacher.split(' ')[0]} {lesson?.auditory}</Text>
                </div>
            </> 
        )
    } else {
        return(
            <>
                <div className='stick'></div>
                <div className='lesson'>
                    <Text weight="semibold">-</Text>
                </div>
            </> 
        )
    }
}

export default Lesson;