import React, {useEffect} from "react";
import { TabsItem, Text} from "@vkontakte/vkui";
import {useStore} from 'effector-react'
import {timetableStore, setDay} from "../../../modules/effector/TimetableStore";

type IDay = {
    dayIndex: number,
    name: string,
}

const Day = (props : IDay) => {
    const {day} = useStore(timetableStore);


    return(
        <TabsItem
            onClick={() => setDay(props.dayIndex)}
            selected={props.dayIndex === day}
            style={{padding:0, display: 'flex', flexDirection: 'column', 
            height: '4.2em', alignItems: 'center', marginBottom: '0.5em'}}
        >   
            <Text style={{padding:0, margin: 0}} weight="regular">{new Date(new Date().getTime() +(((props.dayIndex + 1) - new Date().getDay()) *24*60*60*1000)).getDate()}</Text>
            <Text style={{padding:0, margin: 0, fontSize: '1.35em'}} weight="semibold">{props.name}</Text>
        </TabsItem>
    )
}

export default Day;