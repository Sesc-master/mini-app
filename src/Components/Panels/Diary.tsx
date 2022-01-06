import React from 'react';
import {Div} from "@vkontakte/vkui";

// import '@vkontakte/vkui/dist/vkui.css';
import Login from '../Login';
import Task from '../Task';

const Diary = () => {

	return (
		<>
			<Login />
			<Div>
				<Task topic='12341234124324123412341243241234123412432412341234124324123412341243241234123412432412341234124324' homework='kpgh[iadsnfg[pasj' weight='4' mark='нннн' date='123'/>
			</Div>
		</>

	);
}

export default Diary;