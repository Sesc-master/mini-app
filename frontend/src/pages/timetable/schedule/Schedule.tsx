import React, {useEffect, useState} from 'react';
import ScheduleItem from "../../../components/ScheduleItem";
import {times} from "../times";
import {TimetableElement} from "../../../modules/ListifySchedule";


const Schedule = ({schedule} : {schedule: Array<TimetableElement>}) => {


    return (
        <>
            {Array.from(schedule).map((el, index) => (
                <div key={index}>
                    <ScheduleItem schedule={el} time={times[index]}/>
                </div>)
            )}
        </>
    )
};

export default Schedule;