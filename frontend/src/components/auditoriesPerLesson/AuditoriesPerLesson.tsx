import React, {useState} from "react";
import {Cell, Div} from "@vkontakte/vkui";
import Icon from "../Icon";
import {IconName} from "../../modules/IconName";

type IAuditoriesPerLesson = {
    lesson: number,
    auditories: string [] | undefined
}

const AuditoriesPerLesson = (props : IAuditoriesPerLesson) => {
    const [isVisible, setVisibility] = useState(false)

    return(
        <>
            <Cell before={<Icon iconName={IconName.EmptyRoom}/>} onClick={() =>{setVisibility(!isVisible)}}>
                {`свободны во время ${props.lesson} урока`}
            </Cell>
            { isVisible && <Div>{props.auditories?.join(", ")}</Div> }
        </>
    )
};

export default AuditoriesPerLesson;