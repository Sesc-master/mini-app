import React, {useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import './styles/Global.scss'
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