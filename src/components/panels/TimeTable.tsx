import React, { useState } from 'react';
import { FormItem, SelectMimicry, Tabs, TabsItem, Text, Div} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';

type ISetActiveView = () => void;

type ITimeTable = { 
	setActiveView: ISetActiveView,
	grade: string
}

const TimeTable = ({setActiveView, grade} : ITimeTable) => {
	const [dayIndex, setDayIndex] = useState(0)


	return (
		<>
		 	<FormItem top="Выберите класс">
				<SelectMimicry
					placeholder="Не выбран"
					onClick={() => setActiveView()}
				>{grade}</SelectMimicry>
			</FormItem>
			<Tabs>
				<TabsItem
					onClick={() => setDayIndex(1)}
					selected={dayIndex === 1}
					style={{padding:0}}
				>
					ПН
				</TabsItem>
				<TabsItem
					onClick={() => setDayIndex(2)}
					selected={dayIndex === 2}
					style={{padding:0}}
				>
					ВТ
				</TabsItem>
				<TabsItem
					onClick={() => setDayIndex(3)}
					selected={dayIndex === 3}
					style={{padding:0}}
				>
					СР
				</TabsItem>
				<TabsItem
					onClick={() => setDayIndex(4)}
					selected={dayIndex === 4}
					style={{padding:0}}
				>
					ЧТ
				</TabsItem>
				<TabsItem
					onClick={() => setDayIndex(5)}
					selected={dayIndex === 5}
					style={{padding:0}}
				>
					ПТ
				</TabsItem>
				<TabsItem
					onClick={() => setDayIndex(6)}
					selected={dayIndex === 6}
					style={{padding:0}}
				>
					СБ
				</TabsItem>
			</Tabs>
			<Div>
				<Text weight="semibold">
					day: {dayIndex}
				</Text>
				<Text weight="semibold">
					grade: {grade}
				</Text>
			</Div>
		</>
	);
}

export default TimeTable;