import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {ConfigProvider, AppRoot, Root, View, Panel} from "@vkontakte/vkui";
import './index.css';

import '@vkontakte/vkui/dist/vkui.css';
import Navbar from './components/Navbar';
import TimeTable from './components/panels/TimeTable';
import AppHeader from './components/AppHeader';
import Diary from './components/panels/Diary';
import About from './components/panels/About';
import Grades from './components/panels/Grades';

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
							<TimeTable grade={grade} setActiveView={() => setActiveView('grades')}/>
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
							<About/>
						</Panel>
					</View>
					<View id="grades" activePanel="panel">
						<Panel id='panel'>
							<Grades setGrade={setGrade} setActiveView={() => setActiveView('time-table')}/>
						</Panel>
					</View>
				</Root>
			</AppRoot>
    	</ConfigProvider>
	);
}

export default App;