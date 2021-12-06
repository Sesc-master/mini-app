
import React from 'react';

import '@vkontakte/vkui/dist/vkui.css';
import { List, Cell} from "@vkontakte/vkui";

type ISetOptions = (option: string) => void;

type IOptions = {
	options: string [],
	setOption : ISetOptions
}

const Options = ({options, setOption}: IOptions) => {
	return (
		<List>
			{options?.map((option, index) => (<Cell key={index} onClick={() => setOption(option)}>{option}</Cell>))}
		</List>	
	);
}

export default Options;