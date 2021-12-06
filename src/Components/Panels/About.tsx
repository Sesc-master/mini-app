import React from 'react';
import { Div, Text, Button} from "@vkontakte/vkui";
import ico from "../Images/Icon.svg"

import '@vkontakte/vkui/dist/vkui.css';

const About = () => {

	return (
		<Div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
			<Div>
				<img alt='master' src={ico} style={{height: '125px', borderRadius: '10px'}}/>
			</Div>
			<Div>
				<Text style={{ textAlign: 'center' }} weight={"semibold"}>SESC Master</Text>
			</Div>
			<Div style={{ width:'100%'}}>
				<Button size="l" stretched  mode="outline" >Группа ВК</Button>
     	</Div>
			 <Div style={{ width:'100%'}}>
				<Button size="l" stretched  mode="outline" >Найти свободный кабинет</Button>
     	</Div>
			<Div style={{ width:'100%'}}>
				<Button size="l" stretched  mode="destructive">Выйти из Дневника</Button>
     	</Div>
		</Div>
	);
}

export default About;