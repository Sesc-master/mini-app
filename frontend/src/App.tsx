import React, {useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import './Styles/About.css'
import './Styles/AuditoriesPerLesson.css'
import './Styles/EmptyAuditories.css'
import './Styles/Lesson.css'
import './Styles/Option.css'
import './Styles/Timetable.css'
import './Styles/TimetableItem.css'
import '@vkontakte/vkui/dist/vkui.css';
import './Styles/Task.css'
import './Styles/Global.css'
import './Styles/Marks.css'
import './Styles/MarksTable.css'
import "./Styles/Diary.css"
import "./Styles/Notes.css"
import "./Styles/Absences.css"
import "./Styles/Journal.css"
import "./Styles/Documents.css"
import "./Styles/DesktopNavbar.css"

import ProjectRoot from './Components/ProjectRoot'


const App = () => {
	useEffect(() => {
		bridge.send("VKWebAppInit", {});
	}, []);

	return (
		<ProjectRoot/>
	);
}

export default App;