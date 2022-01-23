import React, {useEffect, useState, useRef} from "react";
import {Div, FormItem, SelectMimicry, Spinner, Text} from "@vkontakte/vkui";
import {Table} from "../../Modules/Table"
import Week from "../Week";
import TimetableItem from "../TimetableItem";
import {listifySchedule, TimetableElement} from "../../Modules/ListifySchedule";
import TimetableItemLoader from "../TimetableItemLoader"
import {setModalView} from "../../Modules/Effector/AppSettingsSrore";
import {Modal} from "../../Modules/Modal";


type ITimetable = {
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
        Array.from(timetable).map((el, index) => (
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

const Timetable = ({ grade } : ITimetable) => {
    const [targetDayIndex, setTargetDayIndex] = useState(1)
    const [timetable, setTimetable] = useState<Array<TimetableElement>>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [weekSchedule, setWeekSchedule] = useState<Array<any>>([])
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

    const isTimetableRendering = !isError && !isLoading && !!timetable.length && grade
    const isInstructionRendering = !isError && !grade
    const isLoaderRendering = !isError && isLoading && grade

    const memorizeGrade = (grade: string) => {
        localStorage.setItem('grade', grade)
    }

    const onGradeChange = async () => {
        if (!grade) return

        setIsError(false)
        setIsLoading(true)

        const weekSchedule = await Table.getTableForWeek(grade)
        setWeekSchedule(weekSchedule)
        const lessons = listifySchedule(weekSchedule[targetDayIndex - 1])

        setTimetable(lessons);
        setIsLoading(false)

        if (weekSchedule[targetDayIndex - 1] === undefined){
            setIsError(true)
        }
    }

    useEffect(() => {
        setIsError(false)
        if (!grade) return;
        if (weekSchedule[targetDayIndex - 1] === undefined){
            setIsError(true)
            return;
        }
        const lessons = listifySchedule(weekSchedule[targetDayIndex - 1])
        setTimetable(lessons)
    }, [targetDayIndex])

    useEffect( () => {
        onGradeChange()
    }, [grade])

    return (
        <>
		 	<FormItem top="Выберите класс">
                <SelectMimicry
                    placeholder="Не выбран"
                    onClick={() => setModalView(Modal.Grades)}
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