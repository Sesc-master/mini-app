import React, {useEffect, useState, useRef} from "react";
import {Div, FormItem, SelectMimicry, Spinner, Text, Group, Button} from "@vkontakte/vkui";
import {Table} from "../../Modules/Table"
import Week from "../Week";
import TimetableItem from "../TimetableItem";
import {listifySchedule, TimetableElement} from "../../Modules/ListifySchedule";
import TimetableItemLoader from "../TimetableItemLoader"
import {setModalView} from "../../Modules/Effector/AppSettingsSrore";
import {Modal} from "../../Modules/Modal";
import {useStore} from "effector-react";
import {
    setGrade, 
    timetableStore, 
    setIsError, 
} from '../../Modules/Effector/TimetableStore';
import {loadTimetable} from '../../Hooks/loadTimetable'


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


const Timetable = () => {
    const {grade, weekSchedule, isError, isTimetableLoading} = useStore(timetableStore)
    const [targetDayIndex, setTargetDayIndex] = useState(1)
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
    ]

    const isTimetableRendering = !isError && !isTimetableLoading && !!timetable.length && grade
    const isInstructionRendering = !isError && !grade
    const isLoaderRendering = isTimetableLoading && grade


    const renderError = () => {
        return (
            <>
                <div className="error">
                    <div className="timetable-text-error">Что-то пошло не так...</div>
                    <div className="timetable-btn" onClick={() => {
                        loadTimetable(grade)
                    }}>
                        <div>
                            Перезагрузить
                        </div>
                    </div>
                </div>
            </>
        )
    }

    useEffect( () => {
        if (isFirstRender.current && weekSchedule.length === 0){
            const grade = localStorage.getItem('grade') || ''
            setGrade(grade)
            const targetDay = new Date().getDay();
            setTargetDayIndex(targetDay === 0 ? targetDay + 1 : targetDay)
            loadTimetable(grade)
            isFirstRender.current = false
        }
            
        setIsError(false)

        if (!grade) return;
        if (weekSchedule[targetDayIndex - 1] === undefined){
            setIsError(true)
            return;
        }

        const lessons = listifySchedule(weekSchedule[targetDayIndex - 1])
        setTimetable(lessons)
    }, [targetDayIndex, weekSchedule])

    return (
        <div style={{margin: '0.3em'}}>
            <FormItem top="Выберите класс">
                <SelectMimicry
                    placeholder="Не выбран"
                    onClick={() => setModalView(Modal.Grades)}
                >{grade}</SelectMimicry>
            </FormItem>
            <Week setTargetDayIndex={setTargetDayIndex} targetIndex={targetDayIndex}/>
            
            <div className='elements'>
                {isError && !isTimetableLoading && renderError()}
                {isInstructionRendering && renderInstruction()}
                {isTimetableRendering && renderTimetable(timetable, times)}
                {isLoaderRendering && renderLoader(times)}
            </div>
            <Div className='end'></Div>
        </div>
    );
}

export default Timetable