import React from 'react';
import TimetableItemLoader from "../../components/TimetableItemLoader";
import {Spinner} from "@vkontakte/vkui";
import {times} from "./times"

const ScheduleLoader = () => {
    return (
        <>
            {times.map((time, index) => <div key={index}><TimetableItemLoader time={time}/></div>)}
            <div className="loader">
                <Spinner size="medium"/>
            </div>
        </>
    );
};

export default ScheduleLoader;