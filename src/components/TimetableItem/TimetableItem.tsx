import React from 'react';
import {Text} from "@vkontakte/vkui";
import './Task.css'

import '@vkontakte/vkui/dist/vkui.css';

type ITask = {
	date : string, 
	topic : string, 
	homework : string, 
	mark : string
}

const Task = ({date, topic, homework, mark}: ITask) => {
	
	return (	
		<div className='task' id='ripple'>
			<div className='date'>
				<Text weight="semibold" style={{ display: 'flex', fontFamily: 'sans-serif', color: 'white', marginLeft: '10px'}}>{date}</Text>
				<div className='stick'></div>
			</div>
			<Text weight="semibold" style={{fontFamily: 'sans-serif', color: 'white',  overflowY: 'hidden', maxHeight: '100%', textAlign: 'center'}}>
				{topic}
			</Text>
			<div style={{display: 'flex', alignItems: 'center', width: '40px'}}>
				<div className='stick'></div>
				<Text weight="semibold" style={{ fontFamily: 'sans-serif', color: 'white', marginLeft: '10px', marginRight: '10px'}}>{mark}</Text>
			</div>
		</div>
	)
}; 

export default Task;