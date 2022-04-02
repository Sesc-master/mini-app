import React from 'react';
import TimetableItemLoader from "../../components/TimetableItemLoader";
import {Spinner} from "@vkontakte/vkui";
import {lessonTimes} from "../../modules/event/lessonTimes"
import Loading from "../../components/loading/Loading";

const ScheduleLoader = () => {
    return (
        <>
            {lessonTimes.map((time, index) => <div key={index}><TimetableItemLoader time={time}/></div>)}
            <Loading />
        </>
    );
};

export default ScheduleLoader;