import React, {useEffect, useRef, useState} from "react";
import {Div, FormItem, SelectMimicry} from "@vkontakte/vkui";
import Week from "./week/Week";
import {listifySchedule} from "../../modules/ListifySchedule";
import {setModalView} from "../../modules/effector/AppSettingsSrore";
import {Modal} from "../../modules/Modal";
import {useStore} from "effector-react";
import {
    timetableStore,
    setDay,
} from '../../modules/effector/TimetableStore';
import Instruction from "./Instruction";
import ScheduleLoader from "./ScheduleLoader";
import Error from "./error/Error";
import Schedule from "./schedule/Schedule";
import Informer from "../../components/informer/Informer";

const Timetable = () => {
    const {grade, weekSchedule, isTimetableLoading, isTeacher, teacher, day} = useStore(timetableStore);

    useEffect(() => {
        const targetDay = new Date().getDay();
        setDay(targetDay === 0 ? 0 : targetDay - 1);
    }, []);

    return (
        <div className='elements'>
            <Informer/>
            <SelectMimicry
                    placeholder="Не выбран"
                    onClick={() => setModalView(Modal.Type)}
            >{isTeacher ? teacher : grade}</SelectMimicry>
            <Week />
            <div>
                {isTeacher && teacher === "" || !isTeacher && grade === "" ? (
                    <Instruction />
                ) : isTimetableLoading ? (
                    <ScheduleLoader />
                ) : weekSchedule[day] ? (
                    <Schedule schedule={listifySchedule(weekSchedule[day])}/>
                ) : (
                    <Error />
                )}
            </div>
        </div>
    );
};

export default Timetable;