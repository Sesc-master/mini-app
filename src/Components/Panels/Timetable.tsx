import React, { useState, useEffect, } from 'react';
import { FormItem, SelectMimicry, Text, Div, } from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import { Table } from "../../Modules/Table"
import Week from '../Week';
import ReactLoading from 'react-loading';
import TimetableItem from '../TimetableItem';
import {listifySchedule} from "../../Modules/ListifySchedule";
import {TimetableElement} from "../../Modules/ListifySchedule";
import '../../Styles/Timetable.css'
import TimetableItemLoader from '../TimetableItemLoader'

type ISetActiveView = () => void;

type ITimetable = { 
	setActiveView: ISetActiveView,
	grade: string
}

const renderInstruction = () => {
	return (
		<div className='instruction'>
			<Text weight="semibold" >Выберите класс и день недели</Text>
		</div>
	)
}

const renderLoader = (times: string [][]) => {
	return (
		<>
			{times.map((time, index) => <div key={index}><TimetableItemLoader time={time}/></div>)}
			<div className="loader">
				<ReactLoading color="gray" type='spin' height="20px" width="20px"/>
			</div>
		</>
	)
	
}

const renderError = () => {
	return (
		<>
			<Text className="error" weight='semibold'>Что-то пошло не так</Text>
			<Text className="error" weight='semibold'>¯\_(ツ)_/¯</Text>
		</>
	)
}

const Timetable = ({setActiveView, grade} : ITimetable) => {
	const [targetDayIndex, setTargetDayIndex] = useState(1)
	const [timetable, setTimetable] = useState<Array<TimetableElement>>([])
	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)

	const times = [
		['09:00', '09:40'],
		['09:50', '10:30'],
		['10:45', '11:25'],
		['11:40', '12:20'],
		['12:35', '13:15'],
		['13:35', '14:15'],
		['14:35', '15:15']
	]

	const isTimetableRendering = !isError && !isLoading && !!timetable.length && grade !== ''
	const isInstructionRendering = !isError && grade === ''
	const isLoaderRendering = !isError && isLoading && grade !== ''

	useEffect(() => {
		try {
			setIsLoading(true)
			Table.getTable("group", targetDayIndex, grade)
				.then(result=> {
					let lessons = listifySchedule(result)
					setTimetable(lessons);
					setIsLoading(false)
				})
				.catch(() => setIsError(true))
		}catch {
			setIsError(true);
		}
	}, [grade, targetDayIndex])

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
				{isTimetableRendering && (
					[...timetable]?.map((el, index) => (
						<div key={index}>
							<TimetableItem schedule={el} time={times[index]}/>
						</div>)
				))}
				{isLoaderRendering && renderLoader(times)}
			</div>
			<Div className='end'></Div>
		</>
	);
}

export default Timetable