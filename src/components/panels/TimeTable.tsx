import React, { useState, useEffect } from 'react';
import { FormItem, SelectMimicry, Tabs, Text, Div, Cell} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';
import { Table } from "../Table"
import { sheduleLesson } from '../Schedule';
import Task from '../task/Task'
import Week from '../Week'

type ISetActiveView = () => void;

type ITimeTable = { 
	setActiveView: ISetActiveView,
	grade: string
}

const TimeTable = ({setActiveView, grade} : ITimeTable) => {
	const [targetDayIndex, setTargetDayIndex] = useState(1)
	const [timetable, setTimetable] = useState<Array<sheduleLesson>>([])


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
					{[...timetable]?.map((el, index) => (<Div key={index}>{el.subject}</Div>) )}
				<Task date='' topic='' homework='' mark='' />
			</Div>
		</>
	);
}

export default TimeTable;