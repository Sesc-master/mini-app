import React, {useState} from "react";
import TextWithLinks from "../textWithLinks/TextWithLinks";
import styles from "./Task.module.scss";
import TopicText from "./TopicText";
import classNames from "classnames";

type ITask = {
    date : string, 
    topic : string, 
    homework : string, 
    mark : string,
    weight : number 
}

const Task = ({date, topic, homework, mark, weight}: ITask) => {
    const [isOpened, setIsOpened] = useState<boolean>(false)
	
    return (	
        <div className={classNames(styles.table)} onClick={() => setIsOpened(!isOpened)}>
            <div className={classNames({[styles.closedTask]: !isOpened}, styles.main)}>
                <div className={classNames(styles.center, styles.taskDate)}>
                    {date}
                </div>
                <div className={classNames(styles.text)}>
                    <TopicText topic={topic} isOpened={isOpened}/>
                </div>
                <div className={styles.info}>
                    <div className={classNames(styles.center, styles.marks, styles.styledTask)}>{mark}</div>
                    <div className={classNames(styles.center, styles.data, styles.styledTask)}>{`${weight}x`}</div>
                </div>
            </div>
            <div className={classNames({[styles.hidden]: !isOpened}, styles.moreInfo)}>
                <TextWithLinks str={homework}/>
            </div>
        </div>
    )
}; 

export default Task;