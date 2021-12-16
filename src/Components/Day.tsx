import React from 'react';
import { TabsItem} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css';

type IDay = {
	setTargetDayIndex: (index: number) => void,
	dayIndex: number,
    targetIndex: number,
    name: string,
}

const Day = (props : IDay) => {
	return(
		<TabsItem
            onClick={() => props.setTargetDayIndex(props.dayIndex)}
            selected={props.dayIndex === props.targetIndex}
            style={{padding:0}}
				>
					{props.name}
		</TabsItem>
	)
}

export default Day;