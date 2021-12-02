import React from 'react';
import {Text} from "@vkontakte/vkui";
import './task.css'

import '@vkontakte/vkui/dist/vkui.css';

const Task = ({date, topic, homework, mark}) => {
	
	return (	
		<div class='task' id='ripple'>
			<div class='date'>
				<Text weight="semibold" style={{ display: 'flex', fontFamily: 'sans-serif', color: 'white', marginLeft: '10px'}}>{date}</Text>
				<div class='stick'></div>
			</div>
			<Text weight="semibold" style={{fontFamily: 'sans-serif', color: 'white',  overflowY: 'hidden', maxHeight: '100%', textAlign: 'center'}}>
				{topic}
			</Text>
			<div style={{display: 'flex', alignItems: 'center', width: '40px'}}>
				<div class='stick'></div>
				<Text weight="semibold" style={{ fontFamily: 'sans-serif', color: 'white', marginLeft: '10px', marginRight: '10px'}}>{mark}</Text>
			</div>
		</div>
	)
}; 

export default Task;