import React from 'react';
import {Text} from "@vkontakte/vkui";
import styles from './TimetableItem.module.css'
import {sсheduleLesson} from '../../Modules/Schedule'
import Lesson from '../Lesson';

import '@vkontakte/vkui/dist/vkui.css';

type ITimetableItem = {
	time : string [], 
	schedule: sсheduleLesson []
}

const TimetableItem = ({time, schedule}: ITimetableItem) => {
	console.log(schedule)
	if (schedule[0] === undefined || schedule[0]?.subgroup === 0){
		return (
		<div className={styles.task} id='ripple'>
			<div className={styles.date}>
				<Text weight="semibold">
					{time[0]}
				</Text>
				<Text weight="semibold">
					{time[1]}	
				</Text>
			</div>
			<Lesson lesson={schedule[0]}/>
		</div>)
	}else {
		const lessons = [...schedule].sort((a, b) => a?.subgroup > b?.subgroup ? 0 : 1)
		let lesson, lesson1 : sсheduleLesson | undefined;
		if (lessons.length == 2){
			[lesson, lesson1] = lessons
		}else if (lessons[0].subgroup == 1){
			lesson = lessons[0]
		}else {
			lesson1 = lessons[0]
		}
		return (
			<div className={styles.task} id='ripple'>
				<div className={styles.date}>
					<Text weight="semibold">
						{time[0]}
					</Text>
					<Text weight="semibold">
						{time[1]}	
					</Text>
				</div>

				<Lesson lesson={lesson}/>
				<Lesson lesson={lesson1}/>

			</div>
		)
	}
}; 

export default TimetableItem;