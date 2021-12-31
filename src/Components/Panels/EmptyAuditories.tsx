import React, {useEffect, useState} from 'react';
import { Div, Button, Text} from "@vkontakte/vkui";
import {getFreeAuditories} from "../../Modules/Schedule"
import  {FullSсhedule}  from '../../Modules/Schedule/FullSchedule';
import AuditoriesPerLesson from "../AuditoriesPerLesson"
import "../../Styles/EmptyAuditories.css"


type IEmptyAuditory = {
    setActiveView: () => void
}

const EmptyAuditory = (props : IEmptyAuditory) => {
    let [auditories, setAuditories]= useState<string[][]>([])

    useEffect(() => {
        getFreeAuditories(new Date().getDate()).then((result) => {setAuditories(result)})
    }, [])
    
    return (
        <Div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
            <Div>
                <Text style={{fontSize: '20px'}} weight="semibold">Свободные аудитории:</Text>
            </Div>
            {[...new Array(7)]?.map((value, index) => (<AuditoriesPerLesson auditories={auditories[index]} lesson={index + 1} />))}
            <Div className="container_close">
                <Button size="m" className="button_close" onClick={props.setActiveView}>Вернуться назад</Button>
            </Div>
            <Div style={{height: '30px'}}></Div>
        </Div>
    );
}

export default EmptyAuditory;