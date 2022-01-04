import React from 'react';

// import '@vkontakte/vkui/dist/vkui.css';
import Login from '../Login';

const Diary = () => {

	return (
		<>
			<Login setLoginData={setLoginData} />
			<Text weight='semibold'>{loginData.token}</Text>
		</>

	);
}

export default Diary;