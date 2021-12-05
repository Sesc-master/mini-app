import React, { useState, useEffect } from 'react';
import { FormItem, SelectMimicry, Tabs, Text, Div, Cell} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import { Table } from "../../Modules/Table"
import { sheduleLesson } from '../../Modules/Schedule';
import Task from '../Task/Task';
import Week from '../Week';
import TimetableItem from '../TimetableItem/TimetableItem';

type ISetActiveView = () => void;

type ITimetable = { 
	setActiveView: ISetActiveView,
	grade: string
}

const Timetable = ({setActiveView, grade} : ITimetable) => {
	const [targetDayIndex, setTargetDayIndex] = useState(1)
	const [Timetable, setTimetable] = useState<Array<sheduleLesson>>([])


	useEffect(() => {
		Table.getTable("group", targetDayIndex, grade)
			.then(result=> {
				setTimetable(result.lessons);
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
				<Text weight="semibold">
					day: {targetDayIndex}
				</Text>
				<Text weight="semibold">
					grade: {grade}
				</Text>
					{[...Timetable]?.map((el, index) => (<Div key={index}>{el.subject}</Div>) )}
				<Task date='' topic='' homework='' mark='' />
			</Div>
		</>
	);
}

export default Timetable