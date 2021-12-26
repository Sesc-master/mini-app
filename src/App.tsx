import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {ConfigProvider, AppRoot, Root, View, Panel} from "@vkontakte/vkui";
import './index.css';

import '@vkontakte/vkui/dist/vkui.css';
import Navbar from './Components/Navbar';
import Timetable from './Components/Panels/Timetable';
import AppHeader from './Components/AppHeader';
import Diary from './Components/Panels/Diary';
import About from './Components/Panels/About';
import Grades from './Components/Panels/Grades';
import EmptyAuditory from "./Components/Panels/EmptyAuditory";

const App = () => {
	const [activeView, setActiveView] = useState('time-table')
	const [grade, setGrade] = useState<string>('')

	useEffect(() => {
		bridge.subscribe(({ detail }) => {
			if (detail?.type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = detail?.data.scheme ? detail?.data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		
	}, []);

	return (
		<ConfigProvider>
			<AppRoot>
				<Navbar setActiveView={(view) => setActiveView(view)}/>
				<Root activeView={activeView}>
					<View id="time-table" activePanel="panel">
						<Panel id='panel'>
							<AppHeader/>
							<Timetable grade={grade} setActiveView={() => setActiveView('grades')}/>
						</Panel>
					</View>
					<View id="register" activePanel="panel">
						<Panel id='panel'>
							<AppHeader/>
							<Diary/>
						</Panel>
					</View>
					<View id="settings" activePanel="panel">
						<Panel id='panel'>
							<AppHeader/>
							<About setActiveView={() => setActiveView('empty-cabinet')}/>
						</Panel>
					</View>
					<View id="grades" activePanel="panel">
						<Panel id='panel'>
							<AppHeader/>
							<Grades setGrade={setGrade} setActiveView={() => setActiveView('time-table')}/>
						</Panel>
					</View>
					<View id="empty-cabinet" activePanel="panel">
						<Panel id='panel'>
							<AppHeader/>
							<EmptyAuditory setActiveView={() => setActiveView('settings')}/>
						</Panel>
					</View>
				</Root>
			</AppRoot>
    	</ConfigProvider>
	);
}

export default App;