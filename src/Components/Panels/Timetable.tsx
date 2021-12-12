import React, { useState, useEffect, useRef} from 'react';
import { FormItem, SelectMimicry, Tabs, Text, Div, Cell} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import { Table } from "../../Modules/Table"
import { sсheduleLesson } from '../../Modules/Schedule';
import Task from '../Task/Task';
import Week from '../Week';
import ReactLoading from 'react-loading';
import TimetableItem from '../TimetableItem/TimetableItem';
import listifySchedule from "../../Modules/ListifySchedule";

type ISetActiveView = () => void;

type ITimetable = { 
	setActiveView: ISetActiveView,
	grade: string
}

const Timetable = ({setActiveView, grade} : ITimetable) => {
	const [targetDayIndex, setTargetDayIndex] = useState(1)
	const [timetable, setTimetable] = useState<Array<Array<sсheduleLesson>>>([])
	const [isLoading, setIsLoading] = useState(false)
	const [isFirstRender, setIsFirstRender] = useState(true)
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
			<div style={{paddingLeft: '2px', paddingRight: '2px'}}>
				{!grade ? (
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px'}}>
						<Text weight="semibold" >Выберите класс и день недели</Text>
					</div>) : !isLoading && timetable.length !== 0 ? 
					[...timetable]?.map((el, index) => (
					<div key={index}>
						<TimetableItem schedule={el} time={times[index]}/>
					</div>) ) : 
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px'}}>
						<ReactLoading type={'spokes'} color={'silver'} height={100} width={100}/>
					</div>
				}
			</div>
			<Div style={{height: '30px'}}></Div>
		</>
	);
}

export default Timetable