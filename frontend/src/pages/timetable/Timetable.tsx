import React, {useEffect, useRef} from "react";
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

const Timetable = () => {
    const {grade, weekSchedule, isTimetableLoading, isTeacher, teacher, day} = useStore(timetableStore);

    useEffect(() => {
        const targetDay = new Date().getDay();
        setDay(targetDay === 0 ? 0 : targetDay - 1);
    }, []);

    return (
        <div>
            <FormItem top={"Выберите класс или учителя"}>
                <SelectMimicry
                    placeholder="Не выбран"
                    onClick={() => setModalView(Modal.Type)}
                >{isTeacher ? teacher : grade}</SelectMimicry>
            </FormItem>
            <Week />
            <div className='elements'>
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
            <Div className='end'></Div>
        </div>
    );
};

export default Timetable;