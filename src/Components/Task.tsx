import React, {useState} from 'react';
import {Text} from "@vkontakte/vkui";

type ITask = {
    date : string, 
    topic : string, 
    homework : string, 
    mark : string,
    weight : number 
}

const Task = ({date, topic, homework, mark, weight}: ITask) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)

    const getClassMoreInfo = () => {
        if (isOpened) {
            return 'more-info'
        }
        return 'more-info hidden-task'
    } 
	
    return (	
        <div className="table" onClick={() => setIsOpened(!isOpened)}>
            <div className="main">
                <div className="center date text-style-task">{date}</div>
                <div className="text text-style-task">
                    {topic}
                </div>
                <div className="info">
                    <div className="center marks text-style-task">{mark}</div>
                    <div className="center data text-style-task">{`${weight}x`}</div>
                </div>
            </div>
            <div className={getClassMoreInfo()}>
                {homework}
            </div>
        </div>
    )
}; 

export default Task;