import React from "react";
import {Text} from "@vkontakte/vkui";
import {TimetableElement} from "../../modules/ListifySchedule";
import Lesson from "./lesson/Lesson";

import "@vkontakte/vkui/dist/vkui.css";

type IScheduleItem = {
    time : string [], 
    schedule: TimetableElement
}

const ScheduleItem = ({time, schedule}: IScheduleItem) => {
    if (schedule.isCommonLesson === true || schedule.isCommonLesson === undefined){
        return (
            <div className='task' id='ripple'>
                <div className='date'>
                    <Text weight="semibold">
                        {time[0]}
                    </Text>
                    <Text weight="semibold">
                        {time[1]}	
                    </Text>
                </div>
                <Lesson lesson={schedule.commonLesson}/>
            </div>)
    }
    else {
        let firstGroupLesson = schedule.firstGroupLesson
        let secondGroupLesson = schedule.secondGroupLesson
        return (
            <div className='task' id='ripple'>
                <div className='date'>
                    <Text weight="semibold">
                        {time[0]}
                    </Text>
                    <Text weight="semibold">
                        {time[1]}	
                    </Text>
                </div>
                <Lesson lesson={firstGroupLesson}/>
                <Lesson lesson={secondGroupLesson}/>
            </div>
        )
    }
}; 

export default ScheduleItem;