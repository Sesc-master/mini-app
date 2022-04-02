import React, {useEffect, useState} from 'react';
import ScheduleItem from "../../../components/ScheduleItem";
import {lessonTimes} from "../../../modules/lessonTimes";
import {TimetableElement} from "../../../modules/ListifySchedule";


const Schedule = ({schedule} : {schedule: Array<TimetableElement>}) => {


    return (
        <>
            {Array.from(schedule).map((el, index) => (
                <div key={index}>
                    <ScheduleItem schedule={el} time={lessonTimes[index]}/>
                </div>)
            )}
        </>
    )
};

export default Schedule;