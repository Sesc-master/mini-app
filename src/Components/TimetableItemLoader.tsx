import React from "react";
// import '../../public/Styles/TimetableItem.css';
import {Text} from "@vkontakte/vkui";

type ITimetableItemLoader = {
    time: string []
}

const TimetableItemLoader = (props : ITimetableItemLoader) => {
    const {time} = props
    return (
        <div className='task'>
            <div className='date'>
                <Text weight="semibold">
                    {time[0]}
                </Text>
                <Text weight="semibold">
                    {time[1]}
                </Text>
            </div>
            <div className='stick'></div>
        </div>
    )
}; 

export default TimetableItemLoader;