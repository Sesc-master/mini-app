import React, {useEffect, useState, useRef} from "react";
import {Div, FormItem, SelectMimicry, Spinner, Text} from "@vkontakte/vkui";
import Week from "../Week";
import TimetableItem from "../TimetableItem";
import {listifySchedule, TimetableElement} from "../../Modules/ListifySchedule";
import TimetableItemLoader from "../TimetableItemLoader"
import {setModalView} from "../../Modules/Effector/AppSettingsSrore";
import {Modal} from "../../Modules/Modal";
import {useStore} from "effector-react";
import {
    setGrade,
    setIsError,
    setIsTeacher,
    setIsTimetableLoading,
    timetableStore,
    setTeacher
} from '../../Modules/Effector/TimetableStore';
import {loadTimetable} from '../../Hooks/loadTimetable'
import {StorageKey} from "../../Modules/StorageKey";


const renderInstruction = () => {
    return (
        <Text className='instruction' weight="semibold" >Выберите класс и день недели</Text>
    )
}

const renderLoader = (times: string [][]) => {
    return (
        <>
            {times.map((time, index) => <div key={index}><TimetableItemLoader time={time}/></div>)}
            <div className="loader">
                <Spinner size="medium"/>
            </div>
        </>
    )
	
}

const renderTimetable = (timetable: TimetableElement [], times: string [][]) => {
    return (
        Array.from(timetable).map((el, index) => (
            <div key={index}>
                <TimetableItem schedule={el} time={times[index]}/>
            </div>)
        ))
}

const getCurrentDay = () => {
    let targetDay = new Date().getDay();
    const hours = new Date().getHours()
    if (hours > 15) {
        if (targetDay === 6 || targetDay === 0)
            targetDay = 1
        else targetDay++
    }
    return targetDay
}


const Timetable = () => {
    const {grade, weekSchedule, isError, isTimetableLoading, isTeacher, teacher} = useStore(timetableStore)
    const [targetDayIndex, setTargetDayIndex] = useState(getCurrentDay())
    const [timetable, setTimetable] = useState<Array<TimetableElement>>([])
    const isFirstRender = useRef<boolean>(true)

    const times = [
        ["09:00", "09:40"],
        ["09:50", "10:30"],
        ["10:45", "11:25"],
        ["11:40", "12:20"],
        ["12:35", "13:15"],
        ["13:35", "14:15"],
        ["14:35", "15:15"]
    ];
    const isInstructionRendering = !grade && !isTeacher || isTeacher && !teacher;
    const isTimetableRendering = !isError && !isTimetableLoading && weekSchedule.length !== 0;


    const renderError = () => {
        return (
            <div className="error">
                <div className="timetable-text-error">Что-то пошло не так...</div>
                <div className="timetable-btn" onClick={() => {
                    loadTimetable(isTeacher ? teacher : grade, isTeacher)
                }}>
                    <div>
                        Перезагрузить
                    </div>
                </div>
            </div>
        )
    }

    useEffect( () => {
        if (isFirstRender.current && weekSchedule.length === 0){
            const {key, isTeacher} = JSON.parse(localStorage.getItem(StorageKey.Timetable) || '{}')
            isTeacher ? setTeacher(key) : setGrade(key);
            setIsTeacher(isTeacher);
            loadTimetable(key, isTeacher);
            isFirstRender.current = false;
            return;
        }

        setIsError(false)

        if (weekSchedule[targetDayIndex - 1] === undefined && !isTimetableLoading){
            setIsError(true);
            setIsTimetableLoading(false);
            return;
        }

        const lessons = listifySchedule(weekSchedule[targetDayIndex - 1])
        setTimetable(lessons)
    }, [weekSchedule, targetDayIndex])

    useEffect(() => {
        const targetDay = new Date().getDay();
        setTargetDayIndex(targetDay === 0 ? targetDay + 1 : targetDay)
    }, []);

    return (
        <div>
            <FormItem top={"Выберите класс или учителя"}>
                <SelectMimicry
                    placeholder="Не выбран"
                    onClick={() => setModalView(Modal.Type)}
                >{isTeacher ? teacher : grade}</SelectMimicry>
            </FormItem>
            <Week setTargetDayIndex={setTargetDayIndex} targetIndex={targetDayIndex}/>
            <div className='elements'>
                {!isInstructionRendering && isTimetableLoading && renderLoader(times)}
                {!isInstructionRendering && isError && !isTimetableLoading && renderError()}
                {isInstructionRendering && renderInstruction()}
                {!isInstructionRendering && isTimetableRendering && renderTimetable(timetable, times)}
            </div>
            <Div className='end'></Div>
        </div>
    );
};

export default Timetable;