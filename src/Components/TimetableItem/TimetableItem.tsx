import React from 'react';
import {Text} from "@vkontakte/vkui";
import styles from './TimetableItem.module.css'
import {baseLesson, sсheduleLesson} from '../../Modules/Schedule'

import '@vkontakte/vkui/dist/vkui.css';

type ITimetableItem = {
	time : string [], 
	schedule: sсheduleLesson []
}

const TimetableItem = ({time, schedule}: ITimetableItem) => {
	if (schedule[0] === undefined){
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
			<div className={styles.stick}></div>
			<div style={{paddingLeft: '5px', overflowX: 'hidden'}}>
				<Text weight="semibold">-</Text>
			</div>
		</div>)
	}else if (schedule[0].subgroup === 0){
		let lesson = schedule[0]
		return (
			<div className={styles.task} id='ripple'>
				<div className={styles.date}>
					<Text weight="semibold" >
						{time[0]}
					</Text>
					<Text weight="semibold" >
						{time[1]}	
					</Text>
				</div>
				<div className={styles.stick}></div>
				<div style={{paddingLeft: '5px', overflowX: 'hidden'}}>
					<Text weight="semibold">{lesson?.subject}</Text>
					<Text weight="regular">{lesson?.teacher.split(' ')[0]} {lesson.auditory}</Text>
				</div>
			</div>
		)
	}else if (schedule[0].subgroup === 0){
		let lesson = schedule[0]
		return (
			<div className={styles.task} id='ripple'>
				<div className={styles.date}>
					<Text weight="semibold" >
						{time[0]}
					</Text>
					<Text weight="semibold" >
						{time[1]}	
					</Text>
				</div>
				<div className={styles.stick}></div>
				<div style={{paddingLeft: '5px', overflowX: 'hidden'}}>
					<Text weight="semibold">{lesson?.subject}</Text>
					<Text weight="regular">{lesson?.teacher.split(' ')[0]} {lesson.auditory}</Text>
				</div>
			</div>
		)
	}else if (schedule.length == 2){
		let lesson = schedule[0]
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
					<div className={styles.stick}></div>
					<div style={{paddingLeft: '5px', overflowX: 'hidden', width: '37%'}}>
						<Text weight="semibold">-</Text>
					</div>
					<div className={styles.stick}></div>
					<div style={{paddingLeft: '5px', overflowX: 'hidden', width: '40%'}}>
					<Text weight="semibold">{lesson.subject}</Text>
						<Text weight="regular">{lesson.teacher.split(' ')[0]} {lesson.auditory}</Text>
					</div>
				</div>
		)
	}else if (schedule[0].subgroup === 1){
		let lesson = schedule[0]
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
					<div className={styles.stick}></div>
					<div style={{paddingLeft: '5px', overflowX: 'hidden', width: '37%'}}>
						<Text weight="semibold">{lesson.subject}</Text>
						<Text weight="regular">{lesson.teacher.split(' ')[0]} {lesson.auditory}</Text>
					</div>
					<div className={styles.stick}></div>
					<div style={{paddingLeft: '5px', overflowX: 'hidden', width: '40%'}}>
					<Text weight="semibold">-</Text>
					</div>
				</div>
		)
	} else if (schedule[0].subgroup === 2){

		let lesson2 = schedule[0]
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
					<div className={styles.stick}></div>
					<div style={{paddingLeft: '5px', overflowX: 'hidden', width: '37%'}}>
						<Text weight="semibold">-</Text>
					</div>
					<div className={styles.stick}></div>
					<div style={{paddingLeft: '5px', overflowX: 'hidden', width: '40%'}}>
						<Text weight="semibold">{lesson2?.subject}</Text>
						<Text weight="regular">{lesson2?.teacher.split(' ')[0]} {lesson2?.auditory || '-'}</Text>
					</div>
				</div>
		)
	}else {
		return (
			<div className={styles.task} id='ripple'>
				<div className={styles.date}>
					<Text weight="semibold" >
						{time[0]}
					</Text>
					<Text weight="semibold" >
						{time[1]}	
					</Text>
				</div>
				<div className={styles.stick}></div>
				<div style={{paddingLeft: '5px', overflowX: 'hidden'}}>
					<Text weight="semibold">-</Text>
				</div>
			</div>
		)
	}
}; 

export default TimetableItem;