import React, {useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import './pages/about/About.css'
import './pages/emptyAuditories/AuditoriesPerLesson.css'
import './pages/emptyAuditories/EmptyAuditories.css'
import './pages/timetable/Timetable.css'
import './pages/timetable/TimetableItem.scss'
import '@vkontakte/vkui/dist/vkui.css';
import './styles/Global.scss'
import './pages/marks/Marks.css'
import "./pages/diary/Diary.css"
import "./pages/notes/Notes.css"
import "./pages/absences/Absences.css"
import "./pages/documents/Documents.css"

import ProjectRoot from './components/projectRoot/ProjectRoot'


const App = () => {
	useEffect(() => {
		bridge.send("VKWebAppInit", {});
	}, []);

	return (
		<ProjectRoot/>
	);
}

export default App;