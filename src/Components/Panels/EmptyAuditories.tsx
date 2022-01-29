import React, {useEffect, useState} from "react";
import { Div, Button, Text} from "@vkontakte/vkui";
import {getFreeAuditories} from "../../Modules/Schedule"
import AuditoriesPerLesson from "../AuditoriesPerLesson"
import {useNavigate} from "react-router-dom";
import {Page} from "../../Modules/Routes";
// import "../../../public/Styles/EmptyAuditories.css"


const EmptyAuditory = () => {
    let [auditories, setAuditories]= useState<string[][]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const day = new Date().getDay()
        getFreeAuditories(day === 0 ? 1 : day).then((result) => {setAuditories(result)})
        console.log(day === 0 ? 1 : day - 1)
    }, [])
    
    return (
        <Div style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
            <Div>
                <Text style={{fontSize: "20px"}} weight="semibold">Свободные аудитории:</Text>
            </Div>
            {[...new Array(7)]?.map((value, index) => (<AuditoriesPerLesson auditories={auditories[index]} lesson={index + 1} />))}
            <Div className="container_close">
                <Button size="m" className="button_close" onClick={() => {navigate(Page.About)}}>Вернуться назад</Button>
            </Div>
            <Div style={{height: "30px"}}></Div>
        </Div>
    );
}

export default EmptyAuditory;