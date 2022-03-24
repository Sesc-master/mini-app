import React, {useState} from "react";
import TextWithLinks from "./TextWithLinks"

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
            return "more-info"
        }
        return "more-info hidden-task"
    } 

    const getClassMain = () => {
        if (isOpened) {
            return "main"
        }
        return "main main-closed-task"
    }

    const formatTopicText = (topic: string) => {
        if (topic === undefined) {
            return ''
        }

        const formatedTopicLength = 45
        
        let formatedTopic = topic 

        if (formatedTopic?.length >= formatedTopicLength && !isOpened) {
            formatedTopic = formatedTopic.slice(0, formatedTopicLength) + "..."
        }

        if (isOpened || formatedTopic === "") {
            return (
                <TextWithLinks str={formatedTopic} />
            )
        }

        return (
            <>
                {formatedTopic}
                <p className='instruction-topic-task'>Развернуть</p>
            </>
        )
    }

	
    return (	
        <div className="table" onClick={() => setIsOpened(!isOpened)}>
            <div className={getClassMain()}>
                <div className="center task-date text-style-task">{date}</div>
                <div className="text text-style-task">
                    {formatTopicText(topic)}
                </div>
                <div className="info">
                    <div className="center marks text-style-task">{mark}</div>
                    <div className="center data text-style-task">{`${weight}x`}</div>
                </div>
            </div>
            <div className={getClassMoreInfo()}>
                <TextWithLinks str={homework}/>
            </div>
        </div>
    )
}; 

export default Task;