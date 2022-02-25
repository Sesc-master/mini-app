import React, {useState} from "react";
import {Cell, Div} from "@vkontakte/vkui";
import Icon from "./Icon";
import {IconName} from "../Modules/IconName";

// import "../../public/Styles/AuditoriesPerLesson.css"


type IAuditoriesPerLesson = {
    lesson: number,
    auditories: string [] | undefined
}

const AuditoriesPerLesson = (props : IAuditoriesPerLesson) => {
    const [isVisible, setVisibility] = useState(false)

    return(
        <>
            <Cell before={<Icon iconName={IconName.EmptyRoom}/>} className="button" onClick={() =>{setVisibility(!isVisible)}}>
                {`свободны во время ${props.lesson} урока`}
            </Cell>
            { isVisible && <Div className="auditories">{props.auditories?.join(", ")}</Div> }
        </>
    )
};

export default AuditoriesPerLesson;