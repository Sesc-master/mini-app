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

type ISetActiveView = () => void;

type ITimetable = { 
	setActiveView: ISetActiveView,
	grade: string
}

const renderInstruction = () => {
	return (
		<div className='loader'>
			<Text weight="semibold" >Выберите класс и день недели</Text>
		</div>
	)
}

const renderLoader = () => {
	return (					
		<div className='loader'>
			<ReactLoading type={'spokes'} color={'silver'} height={100} width={100}/>
		</div>
	)
}

const renderError = () => {
	return (
		<Text weight='semibold'>Что-то пошло не так</Text>
	)
}


const Timetable = ({setActiveView, grade} : ITimetable) => {
	const [targetDayIndex, setTargetDayIndex] = useState(1)
	const [timetable, setTimetable] = useState<Array<TimetableElement>>([])
	const [isLoading, setIsLoading] = useState(false)
	const [isFirstRender, setIsFirstRender] = useState(true)
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

	useEffect(() => {
		try {
			if (isFirstRender){
				setIsFirstRender(false)
			}
			setIsLoading(true)
			Table.getTable("group", targetDayIndex, grade)
				.then(result=> {
					let lessons = listifySchedule(result)
					setTimetable(lessons);
					setTimeout(() => setIsLoading(false), 300)
				})
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
				{
					isError ? renderError() : 
					grade === '' ? renderInstruction() : 
					isLoading === false && timetable.length !== 0 ? 
						[...timetable]?.map((el, index) => (
						<div key={index}>
							<TimetableItem schedule={el} time={times[index]}/>
						</div>) ) : 
					renderLoader()
				}
			</div>
			<Div className='end'></Div>
		</>
	);
}

export default Timetable