import React from "react";
import Day from "./Day";
import { Tabs } from "@vkontakte/vkui";

const Week = () => {
    let names = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"]


    return(
        <Tabs style={{color: 'white'}}>
            {names.map((element, index) => (
                <Day key={index} name={element}
                     dayIndex={index}/>))}
        </Tabs>
    )
}

export default Week;