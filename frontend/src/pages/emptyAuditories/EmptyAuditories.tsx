import React, {useEffect, useState} from "react";
import {Div, Header} from "@vkontakte/vkui";
import {getFreeAuditories} from "../../modules/schedule/Schedule"
import AuditoriesPerLesson from "../../components/auditoriesPerLesson/AuditoriesPerLesson"
import {useNavigate} from "react-router-dom";
import {Page} from "../../components/projectRoot/Page";
// import "../../../public/styles/EmptyAuditories.css"


const EmptyAuditory = () => {
    let [auditories, setAuditories]= useState<string[][]>([])
    const navigate = useNavigate()

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