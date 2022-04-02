import React, {useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import './styles/About.css'
import './styles/AuditoriesPerLesson.css'
import './styles/EmptyAuditories.css'
import './components/lesson/Lesson.module.scss'
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
import "./components/journal/Journal.module.scss"
import "./styles/Documents.css"
import "./styles/DesktopNavbar.css"

import ProjectRoot from './components/ProjectRoot'
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const App = () => {
	useEffect(() => {
		bridge.send("VKWebAppInit", {});
	}, []);

	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = React.useMemo(
		() =>
			createTheme({
				palette: {
					mode: prefersDarkMode ? 'dark' : 'light',
				},
			}),
		[prefersDarkMode],
	);

	return (
		<ThemeProvider theme={theme}>
			<ProjectRoot/>
		</ThemeProvider>

	);
}

export default App;