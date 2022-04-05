import React from "react";
import Day from "./Day";
import { Tabs } from "@vkontakte/vkui";

const Week = () => {
    let names = ["MON", "TUE", "WED", "THU", "FRI", "SAT"]


    return(
        <Tabs>
            {names.map((element, index) => (
                <Day key={index} name={element}
                     dayIndex={index}/>))}
        </Tabs>
    )
}

export default Week;