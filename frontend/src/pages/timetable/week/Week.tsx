import React from "react";
import Day from "./Day";
import { Tabs } from "@vkontakte/vkui";

const Week = () => {
    let names = ["mon", "tue", "wed", "thu", "fri", "sat"]


    return(
        <Tabs>
            {names.map((element, index) => (
                <Day key={index} name={element}
                     dayIndex={index}/>))}
        </Tabs>
    )
}

export default Week;