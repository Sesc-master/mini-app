import React, {useEffect} from "react";
import Week from "./week/Week";
import {format} from "../../modules/schedule/format";
import {setModalView} from "../../modules/effector/AppSettingsSrore";
import {Modal} from "../../modules/Modal";
import {useStore} from "effector-react";
import {setDay, timetableStore,} from '../../modules/effector/TimetableStore';
import Instruction from "./components/instruction/Instruction";
import ScheduleLoader from "./components/scheduleLoader/ScheduleLoader";
import Error from "./components/error/Error";
import DailySchedule from "./components/DailySchedule";
import Informer from "../../components/informer/Informer";
import {getCurrentDay} from "./week/GetCurrentDay";
import Select from "../../components/select/Select";

const Schedule = () => {
    const {grade, weekSchedule, isTimetableLoading, isTeacher, teacher, day} = useStore(timetableStore);

    useEffect(() => {
        const targetDay = getCurrentDay();
        setDay(targetDay === 0 ? 0 : targetDay - 1);
    }, []);

    return (
        <div className="content">
            <Informer/>
            <Select
                placeholder={"Не выбран"}
                value={isTeacher ? teacher : grade}
                handler={() => {setModalView(Modal.Type)}} />
            <Week />
            <div>
                {isTeacher && teacher === "" || !isTeacher && grade === "" ? (
                    <Instruction />
                ) : isTimetableLoading ? (
                    <ScheduleLoader />
                ) : weekSchedule[day] ? (
                    <DailySchedule schedule={format(weekSchedule[day])}/>
                ) : (
                    <Error />
                )}
            </div>
        </div>
    );
};

export default Schedule;