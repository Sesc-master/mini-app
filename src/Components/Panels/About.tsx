import React from 'react';
import { Div, Button} from "@vkontakte/vkui";
import ico from "../Images/Icon.svg"
import '../../Styles/About.css'

import '@vkontakte/vkui/dist/vkui.css';

type IAbout = {
	setActiveView: () => void
}

const About = (props : IAbout) => {

	return (
		<Div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
			{/* <Div>
				<img alt='master' src={ico} className='icon'/>
			</Div>
			<Div>
				<h1 className='app-name'>SESC Master</h1>
			</Div> */}
			<Div className='link'>
				<Button size="l" stretched mode="outline" >Группа ВК</Button>
     		</Div>
			 <Div className='link'>
				<Button size="l" stretched mode="outline" onClick={props.setActiveView}>Найти свободный кабинет</Button>
			</Div>
			<Div className='link'>
					<Button size="l" stretched mode="destructive">Выйти из Дневника</Button>
			</Div>
		</Div>
	);
}

export default About;