import { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import {ConfigProvider, AppRoot, Root, View, Panel, SSRWrapper} from "@vkontakte/vkui";
import '../public/Styles/About.css'
import '../public/Styles/AuditoriesPerLesson.css'
import '../public/Styles/EmptyAuditories.css'
import '../public/Styles/Lesson.css'
import '../public/Styles/Option.css'
import '../public/Styles/Timetable.css'
import '../public/Styles/TimetableItem.css'
import '@vkontakte/vkui/dist/vkui.css';
import '../public/Styles/Task.css'
import '../public/Styles/Global.css'

import ProjectRoot from '../src/Components/ProjectRoot'
import { IRootState } from '../src/Modules/IRootState';

import { createStore } from 'redux'
import { Provider } from 'react-redux'


let defaultState : IRootState = {
	subjects: [],
	journal: {},
	isJournalLoaded: false,
	targetSubject: '',
	localStorageLogin: 'loginData',
	token: '',
	scheme: 'client_dark'
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
	case 'SET_TOKEN':
		return {...state, token: action.payload}
	case 'SET_SCHEME':
		return {...state, scheme: action.payload}
	default:
		return state
  }
}

let store = createStore(reducer);

const _app = () => {
	const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12A365 Safari/600.1.4';
	//TODO : get true user-agent

	useEffect(() => {
		bridge.send("VKWebAppInit", {});
	}, []);

	return (
		<SSRWrapper userAgent={userAgent}>
			<Provider store={store}>
					<ProjectRoot />
			</Provider>
		</SSRWrapper>
	);
}


export default _app;