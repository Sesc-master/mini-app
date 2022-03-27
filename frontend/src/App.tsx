import React, {useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import './styles/About.css'
import './styles/AuditoriesPerLesson.css'
import './styles/EmptyAuditories.css'
import './styles/Lesson.css'
import './styles/Option.css'
import './styles/Timetable.css'
import './styles/TimetableItem.css'
import '@vkontakte/vkui/dist/vkui.css';
import './styles/Task.css'
import './styles/Global.css'
import './styles/Marks.css'
import './styles/MarksTable.css'
import "./styles/Diary.css"
import "./styles/Notes.css"
import "./styles/Absences.css"
import "./styles/Journal.css"
import "./styles/Documents.css"
import "./styles/DesktopNavbar.css"

import ProjectRoot from './components/ProjectRoot'


const App = () => {
	useEffect(() => {
		bridge.send("VKWebAppInit", {});
	}, []);

	return (
		<ProjectRoot/>
	);
}

export default App;