import React from 'react';
import {Text} from "@vkontakte/vkui";

type ITask = {
    date : string, 
    topic : string, 
    homework : string, 
    mark : string,
    weight : string
}

const Task = ({date, topic, homework, mark, weight}: ITask) => {
	
    return (	
        <div className="table">
            <input className="hidden-input" type="checkbox" id="check-1"></input>
            <label htmlFor="check-1">
                <div className="main">
                    <div className="center date">{date}</div>
                    <div className="text">
                        {topic}
                    </div>
                    <div className="info">
                        <div className="center marks">{mark}</div>
                        <div className="center data">{`${weight}x`}</div>
                    </div>
                </div>
            </label>
            <div className="more-info">
                {homework}
            </div>
        </div>
    )
}; 

export default Task;