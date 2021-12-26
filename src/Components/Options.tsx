
import React from 'react';

import '@vkontakte/vkui/dist/vkui.css';
import { List, Div } from "@vkontakte/vkui";
import '../Styles/Option.css'

type ISetOptions = (option: string) => void;

type IOptions = {
	options: string [],
	setOption : ISetOptions
}

const Options = ({options, setOption}: IOptions) => {
	return (
		<List>
			{options?.map((option, index) => (<Div key={index} onClick={() => setOption(option)} className="option">{option}</Div>))}
		</List>	
	);
}

export default Options;