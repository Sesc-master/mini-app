import React from 'react';
import Day from './Day';
import { Tabs } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

type IWeek = {
	setTargetDayIndex: (index: number) => void,
	targetIndex: number,
}

const Week = (props : IWeek) => {
	let names = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ']


	return(
		<Tabs>
			{names.map((element, index) => (<Day name={element} targetIndex={props.targetIndex} setTargetDayIndex={props.setTargetDayIndex} dayIndex={index + 1}/>))}
		</Tabs>
	)
}

export default Week;