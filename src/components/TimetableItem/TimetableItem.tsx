import React from 'react';
import {Text} from "@vkontakte/vkui";
import styles from './TimetableItem.module.css'

import '@vkontakte/vkui/dist/vkui.css';

type ITimetableItem = {
	time : string [], 
	teacher : string, 
	auditory : string, 
	subgroup: number,
	subject: string
}

const TimetableItem = ({time, teacher, auditory, subgroup, subject}: ITimetableItem) => {
	
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
				<Text weight="semibold" style={{color: 'white'}}>{subject}</Text>
				<Text weight="semibold" style={{color: 'white'}}>{auditory}</Text>
			</div>
		</div>
	)
}; 

export default TimetableItem;