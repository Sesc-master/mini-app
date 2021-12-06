import React from 'react';
import {Text} from "@vkontakte/vkui";
import styles from './TimetableItem.module.css'
import {sсheduleLesson} from '../../Modules/Schedule'

import '@vkontakte/vkui/dist/vkui.css';

type ITimetableItem = {
	time : string [], 
	schedule: sсheduleLesson []
}

const TimetableItem = ({time, schedule}: ITimetableItem) => {
	if (schedule.length === 1){
		let lesson = schedule[0]
		return (
			<div className={styles.task} id='ripple'>
				<div className={styles.date}>
					<Text weight="semibold" style={{ display: 'flex', color: 'white'}}>
						{time[0]}
					</Text>
					<Text weight="semibold" style={{ display: 'flex', color: 'white'}}>
						{time[1]}	
					</Text>
				</div>
				<div className={styles.stick}></div>
				<div style={{paddingLeft: '5px', overflowX: 'hidden'}}>
					<Text weight="semibold" style={{color: 'white'}}>{lesson.subject}</Text>
					<Text weight="regular" style={{color: 'white'}}>{lesson.teacher.split(' ')[0]} {lesson.auditory}</Text>
				</div>
			</div>
		)
	}else if (schedule.length === 2){
		let lesson = schedule[0]
		let lesson2 = schedule[1]
		return (
			<div style={{display: 'flex', padding: 0, margin: 0, border: 0}}>
				<div className={styles.task} id='ripple' style={{width: '55%'}}>
					<div className={styles.date}>
						<Text weight="semibold" style={{ display: 'flex', color: 'white'}}>
							{time[0]}
						</Text>
						<Text weight="semibold" style={{ display: 'flex', color: 'white'}}>
							{time[1]}	
						</Text>
					</div>
					<div className={styles.stick}></div>
					<div style={{paddingLeft: '5px', overflowX: 'hidden'}}>
						<Text weight="semibold" style={{color: 'white'}}>{lesson.subject}</Text>
						<Text weight="regular" style={{color: 'white'}}>{lesson.teacher.split(' ')[0]} {lesson.auditory}</Text>
					</div>
				</div>
				<div className={styles.task} id='ripple' style={{width: '44%', marginLeft: '1%'}}>
					<div style={{paddingLeft: '5px', overflowX: 'hidden'}}>
						<Text weight="semibold" style={{color: 'white'}}>{lesson2.subject}</Text>
						<Text weight="regular" style={{color: 'white'}}>{lesson2.teacher.split(' ')[0]} {lesson2.auditory}</Text>
					</div>
				</div>
			</div>
		)
	} else {
		return(	
		<div className={styles.task} id='ripple'>
			<div className={styles.date}>
				<Text weight="semibold" style={{ display: 'flex', color: 'white'}}>
					{time[0]}
				</Text>
				<Text weight="semibold" style={{ display: 'flex', color: 'white'}}>
					{time[1]}	
				</Text>
			</div>
			<div className={styles.stick}></div>
			<div style={{paddingLeft: '5px', overflowX: 'hidden'}}>
				<Text weight="semibold" style={{color: 'white'}}>-</Text>
			</div>
		</div>
		)
	}
}; 

export default TimetableItem;