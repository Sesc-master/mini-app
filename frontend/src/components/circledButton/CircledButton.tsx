import React from 'react';
import {useLoadTimetable} from "../../hooks/useLoadTimetable";
import {ICircledButton} from "./ICircledButton";

const CircledButton = ({text, handler} : ICircledButton) => {
    return (
        <div className="timetable-btn" onClick={() => handler()}>
            <div>
                {text}
            </div>
        </div>
    );
};

export default CircledButton;