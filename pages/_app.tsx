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
import '../public/Styles/Task.css'

import Navbar from '../src/Components/Navbar';
import Timetable from '../src/Components/Panels/Timetable';
import AppHeader from '../src/Components/AppHeader';
import Diary from '../src/Components/Panels/Diary';
import About from '../src/Components/Panels/About';
import Grades from '../src/Components/Panels/Grades';
import EmptyAuditories from "../src/Components/Panels/EmptyAuditories";
import Subjects from '../src/Components/Panels/Subjects'
import { IRootState } from '../src/Modules/IRootState';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

let defaultState : IRootState = {
	subjects: [],
	journal: {},
	isJournalLoaded: false,
	targetSubject: '',
}

function reducer(state = defaultState, action) {
  switch (action.type) {
	case 'SET_SUBJECTS':
		return {...state, subjects: action.payload}
	case 'SET_JOURNAL':
		return {...state, journal: action.payload}
	case 'SET_IS_JOURNAL_LOADED':
		return {...state, isJournalLoaded: action.payload}
	case 'SET_TARGET_SUBJECT':
		return {...state, targetSubject: action.payload}
	default:
		return state
  }
}

let store = createStore(reducer);

const _app = () => {
	const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4';
	//TODO : get true user-agent
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
		<SSRWrapper userAgent={userAgent}>
			<Provider store={store}>
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
									<Diary setActiveViewSubjects={() => setActiveView('subjects')}/>
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
							<View id="subjects" activePanel="panel">
								<Panel id='panel'>
									<AppHeader/>
									<Subjects setActiveViewDiary={() => setActiveView("register")}/>
								</Panel>
							</View>
						</Root>
					</AppRoot>
				</ConfigProvider>
			</Provider>
		</SSRWrapper>
	);
}


export default _app;