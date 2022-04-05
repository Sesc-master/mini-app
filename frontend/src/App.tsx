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