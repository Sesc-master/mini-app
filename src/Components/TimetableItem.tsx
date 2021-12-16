import React from 'react';
import {Text} from "@vkontakte/vkui";
import '../Styles/TimetableItem.css'
import {TimetableElement} from "../Modules/ListifySchedule";
import Lesson from './Lesson';

import '@vkontakte/vkui/dist/vkui.css';

type ITimetableItem = {
	time : string [], 
	schedule: TimetableElement
}

const TimetableItem = ({time, schedule}: ITimetableItem) => {
	if (schedule.isCommonLesson === true || schedule.isCommonLesson === undefined){
		return (
		<div className='task' id='ripple'>
			<div className='date'>
				<Text weight="semibold">
					{time[0]}
				</Text>
				<Text weight="semibold">
					{time[1]}	
				</Text>
			</div>
			<Lesson lesson={schedule.commonLesson}/>
		</div>)
	}else {
		let firstGroupLesson = schedule.firstGroupLesson
		let secondGroupLesson = schedule.secondGroupLesson
		return (
			<div className='task' id='ripple'>
				<div className='date'>
					<Text weight="semibold">
						{time[0]}
					</Text>
					<Text weight="semibold">
						{time[1]}	
					</Text>
				</div>
				<Lesson lesson={firstGroupLesson}/>
				<Lesson lesson={secondGroupLesson}/>
			</div>
		)
	}
}; 

export default TimetableItem;