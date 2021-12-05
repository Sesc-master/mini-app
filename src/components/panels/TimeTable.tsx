import React, { useState, useEffect } from 'react';
import { FormItem, SelectMimicry, Tabs, Text, Div, Cell} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import { Table } from "../../Modules/Table"
import { sheduleLesson } from '../../Modules/Schedule';
import Task from '../Task/Task';
import Week from '../Week';
import ReactLoading from 'react-loading';
import TimetableItem from '../TimetableItem/TimetableItem';

type ISetActiveView = () => void;

type ITimetable = { 
	setActiveView: ISetActiveView,
	grade: string
}

const Timetable = ({setActiveView, grade} : ITimetable) => {
	const [targetDayIndex, setTargetDayIndex] = useState(1)
	const [timetable, setTimetable] = useState<Array<sheduleLesson>>([])
	const [isLoading, setIsLoading] = useState(false)
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
		setIsLoading(true)
		Table.getTable("group", targetDayIndex, grade)
			.then(result=> {
				setTimetable(result.lessons);
				setIsLoading(false)
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
			<Div>
					{	!isLoading && timetable.length !== 0 ? 
						[...timetable]?.map((el, index) => (<div key={index}>
							<TimetableItem key={index} time={times[el.number - 1]} teacher={el?.teacher} auditory={el?.auditory} subgroup={1} subject={el.subject}/>
						</div>) ) : 
							<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '50px'}}>
								<ReactLoading type={'spokes'} color={'#47a7f5'} height={100} width={100}/>
							</div>
					}
				<Div style={{height: '20px'}}></Div>
			</Div>
		</>
	);
}

export default Timetable