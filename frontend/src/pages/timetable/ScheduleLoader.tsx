import React from 'react';
import TimetableItemLoader from "../../components/TimetableItemLoader";
import {Spinner} from "@vkontakte/vkui";
import {times} from "./times"
import Loading from "../../components/Loading";

const ScheduleLoader = () => {
    return (
        <>
            {times.map((time, index) => <div key={index}><TimetableItemLoader time={time}/></div>)}
            <Loading />
        </>
    );
};

export default ScheduleLoader;