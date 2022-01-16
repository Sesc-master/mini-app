import React, {useState} from "react";
import { Div, Button} from "@vkontakte/vkui";

// import "../../public/Styles/AuditoriesPerLesson.css"


type IAuditoriesPerLesson = {
    lesson: number,
    auditories: string [] | undefined
}

const AuditoriesPerLesson = (props : IAuditoriesPerLesson) => {
    const [isVisible, setVisibility] = useState(false)

    return(
        <Div className="button-wrapper">
            <Button className="button" size = "m" onClick={() =>{setVisibility(!isVisible)}}>
                {props.lesson + " урок"}
            </Button>
            { isVisible && <Div className="auditories">{props.auditories?.join(", ")}</Div> }
        </Div>
    )
};

export default AuditoriesPerLesson;