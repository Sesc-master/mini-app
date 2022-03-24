import React, {useEffect, useState} from "react";
import { TabsItem, Text} from "@vkontakte/vkui";
// import '@vkontakte/vkui/dist/vkui.css';
import {appSettingsStore} from '../Modules/Effector/AppSettingsSrore'
import {useStore} from 'effector-react'

type IDay = {
    setTargetDayIndex: (index: number) => void,
    dayIndex: number,
    targetIndex: number,
    name: string,
}

const Day = (props : IDay) => {

    return(
        <TabsItem
            onClick={() => props.setTargetDayIndex(props.dayIndex)}
            selected={props.dayIndex === props.targetIndex}
            style={{padding:0, display: 'flex', flexDirection: 'column', 
            height: '4.2em', alignItems: 'center', marginBottom: '0.5em'}}
        >   
            <Text style={{padding:0, margin: 0}} weight="regular">{new Date(new Date().getTime() +((props.dayIndex - new Date().getDay()) *24*60*60*1000)).getDate()}</Text>
            <Text style={{padding:0, margin: 0, fontSize: '1.35em'}} weight="semibold">{props.name}</Text>
        </TabsItem>
    )
}

export default Day;