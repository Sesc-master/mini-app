import React, { useState, useEffect, useRef} from "react";
import { FormItem, SelectMimicry, Text, Div, Spinner} from "@vkontakte/vkui";
// import '@vkontakte/vkui/dist/vkui.css';
import { Table } from "../../Modules/Table"
import Week from "../Week";
import TimetableItem from "../TimetableItem";
import {listifySchedule} from "../../Modules/ListifySchedule";
import {TimetableElement} from "../../Modules/ListifySchedule";
// import '../../../public/Styles/Timetable.css'
import TimetableItemLoader from "../TimetableItemLoader"
import lesson from "../Lesson";

type ISetActiveView = () => void;

type ITimetable = { 
    setActiveView: ISetActiveView,
    grade: string
}

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
        [...timetable]?.map((el, index) => (
            <div key={index}>
                <TimetableItem schedule={el} time={times[index]}/>
            </div>)
        ))
}

const renderError = () => {
    return (
        <>
            <div className="error">
                <Text weight='semibold'>Что-то пошло не так</Text>
                <Text weight='semibold'>¯\_(ツ)_/¯</Text>
            </div>
        </>
    )
}

const Timetable = ({setActiveView, grade} : ITimetable) => {
    const [targetDayIndex, setTargetDayIndex] = useState(1)
    const [timetable, setTimetable] = useState<Array<TimetableElement>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [weekSchedule, setWeekSchedule] = useState([])

    const times = [
        ["09:00", "09:40"],
        ["09:50", "10:30"],
        ["10:45", "11:25"],
        ["11:40", "12:20"],
        ["12:35", "13:15"],
        ["13:35", "14:15"],
        ["14:35", "15:15"]
    ]

    const isTimetableRendering = !isError && !isLoading && !!timetable.length && grade !== ""
    const isInstructionRendering = !isError && grade === ""
    const isLoaderRendering = !isError && isLoading && grade !== ""

    useEffect(() => {
        console.log(targetDayIndex)
        // const lessons = listifySchedule(weekSchedule[targetDayIndex
        if (grade === "") return;

        const lessons = listifySchedule(weekSchedule[targetDayIndex - 1])
        setTimetable(lessons)
    }, [targetDayIndex])

    useEffect(async () => {
        if (grade === "") return;
        setIsError(false)
        try {
            setIsLoading(true)

            const weekSchedule = await Table.getTableForWeek(grade)
            setWeekSchedule(weekSchedule)
            const lessons = listifySchedule(weekSchedule[targetDayIndex - 1])
            setTimetable(lessons);
            setIsLoading(false)
        } catch {
            setIsError(true)
        }
    }, [grade])

    return (
        <>
		 	<FormItem top="Выберите класс">
                <SelectMimicry
                    placeholder="Не выбран"
                    onClick={() => setActiveView()}
                >{grade}</SelectMimicry>
            </FormItem>
            <Week setTargetDayIndex={setTargetDayIndex} targetIndex={targetDayIndex}/>
            <div className='elements'>
                {isError && renderError()}
                {isInstructionRendering && renderInstruction()}
                {isTimetableRendering && renderTimetable(timetable, times)}
                {isLoaderRendering && renderLoader(times)}
            </div>
            <Div className='end'></Div>
        </>
    );
}

export default Timetable