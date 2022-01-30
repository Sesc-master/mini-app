import { useEffect } from 'react';
import Head from 'next/head'
import bridge from '@vkontakte/vk-bridge';
import {SSRWrapper} from "@vkontakte/vkui";
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
import '../public/Styles/Marks.css'
import '../public/Styles/MarksTable.css'
import "../public/Styles/Diary.css"
import "../public/Styles/Notes.css"
import "../public/Styles/Absences.css"
import "../public/Styles/Journal.css"
import "../public/Styles/Documents.css"
import "../public/Styles/DesktopNavbar.css"

import ProjectRoot from '../src/Components/ProjectRoot'


const _app = () => {
	useEffect(() => {
		bridge.send("VKWebAppInit", {});
	}, []);

	return (
		<>
			<Head>
				<title>SESC Master</title>
				<link rel='icon' href="/icon.png" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/icon.png"></link>
			</Head>
			<SSRWrapper >
					{typeof window === 'undefined' ? null : <ProjectRoot />}
			</SSRWrapper>
		</>
	);
}

export default _app;