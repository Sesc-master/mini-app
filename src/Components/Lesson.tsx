import React from 'react';
import {Text} from "@vkontakte/vkui";
import {sсheduleLesson} from '../Modules/Schedule'
  

import '@vkontakte/vkui/dist/vkui.css';

type ILesson = {
    lesson: sсheduleLesson | undefined,
}

const Lesson = ({lesson}: ILesson) => {
    if (lesson){
        return(
            <>
                <div style={{borderLeft: '2px solid #47a7f5', height: '75%'}}></div>
                <div style={{paddingLeft: '5px', overflowX: 'hidden', width: '40%'}}>
                    <Text weight="semibold">{lesson?.subject}</Text> 
                    <Text weight="regular">{lesson?.teacher.split(' ')[0]} {lesson?.auditory}</Text>
                </div>
            </> 
        )
    } else {
        return(
            <>
                <div style={{borderLeft: '2px solid #47a7f5', height: '75%'}}></div>
                <div style={{paddingLeft: '5px', overflowX: 'hidden', width: '40%'}}>
                    <Text weight="semibold">-</Text>
                </div>
            </> 
        )
    }
}

export default Lesson;