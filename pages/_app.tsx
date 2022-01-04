import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {ConfigProvider, AppRoot, Root, View, Panel, SSRWrapper} from "@vkontakte/vkui";
import '../public/Styles/index.css';
import '../public/Styles/About.css'
import '../public/Styles/AuditoriesPerLesson.css'
import '../public/Styles/EmptyAuditories.css'
import '../public/Styles/Lesson.css'
import '../public/Styles/Option.css'
import '../public/Styles/Timetable.css'
import '../public/Styles/TimetableItem.css'
import '@vkontakte/vkui/dist/vkui.css';

import Navbar from '../src/Components/Navbar';
import Timetable from '../src/Components/Panels/Timetable';
import AppHeader from '../src/Components/AppHeader';
import Diary from '../src/Components/Panels/Diary';
import About from '../src/Components/Panels/About';
import Grades from '../src/Components/Panels/Grades';
import EmptyAuditories from "../src/Components/Panels/EmptyAuditories";

const _app = () => {
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
		<SSRWrapper>
			<ConfigProvider scheme="space_gray">
				<AppRoot >
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
								<EmptyAuditories setActiveView={() => setActiveView('settings')}/>
							</Panel>
						</View>
					</Root>
				</AppRoot>
			</ConfigProvider>
		</SSRWrapper>
	);
}

export default _app;