import React from 'react';
import ScheduleLoaderItem from "./ScheduleLoaderItem";
import {lessonTimes} from "../../../../modules/event/lessonTimes"
import Loading from "../../../../components/loading/Loading";

const ScheduleLoader = () => {
    return (
        <>
            {lessonTimes.map((time, index) =>
                <div key={index}>
                    <ScheduleLoaderItem time={time}/>
                </div>)}
            <Loading />
        </>
    );
};

export default ScheduleLoader;