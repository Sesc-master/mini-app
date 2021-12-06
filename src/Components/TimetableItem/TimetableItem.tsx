import React from 'react';
import {Text} from "@vkontakte/vkui";
import './TimetableItem.css'

import '@vkontakte/vkui/dist/vkui.css';

type ITimetableItem = {
	time : string [], 
	teacher : string, 
	auditory : string, 
	subgroup: number
}

const TimetableItem = ({time, teacher, auditory, subgroup}: ITimetableItem) => {
	
	return (	
		<div className='task' id='ripple'>
			<div className='date'>
				<Text weight="semibold" style={{ display: 'flex', fontFamily: 'sans-serif', color: 'white', marginLeft: '10px'}}></Text>
				<div className='stick'></div>
			</div>
		</div>
	)
}; 

export default TimetableItem;