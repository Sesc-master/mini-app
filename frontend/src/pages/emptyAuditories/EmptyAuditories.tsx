import React, {useEffect, useState} from "react";
import {Div, Header} from "@vkontakte/vkui";
import {getFreeAuditories} from "../../modules/schedule/api/Schedule"
import AuditoriesPerLesson from "./auditoriesPerLesson/AuditoriesPerLesson"
import {useNavigate} from "react-router-dom";
import "./EmptyAuditories.scss";


const EmptyAuditory = () => {
    let [auditories, setAuditories]= useState<string[][]>([])

    useEffect(() => {
        const day = new Date().getDay()
        getFreeAuditories(day === 0 ? 1 : day).then((result) => {setAuditories(result)})
    }, [])
    
    return (
        <>
            <Header >Свободные аудитории:</Header>
            {[...new Array(7)]?.map((value, index) => (<AuditoriesPerLesson auditories={auditories[index]} lesson={index + 1} />))}
        </>
    );
}

export default EmptyAuditory;