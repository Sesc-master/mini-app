import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux"
import { IRootState } from "../../Modules/IRootState"
import {getReportCard} from "../../Modules/ScoleAPI";
import MarksTable from "../MarksTable";

const Marks = () => {
    const token = useSelector((state: IRootState) => state.token)
    const {login, type} = JSON.parse(localStorage.getItem("loginData"))
    const [marks, setMarks] = useState([])

    useEffect(async () => {
        const marks = new Map(await getReportCard(login, token, type))
        setMarks(marks)
    }, [])

    return (
        <>
            <h1 className='marks-header'>Табель</h1>
            <div className='marks-content'>
                {Array.from(marks.keys())?.map((subject : any, index) => {
                    return ( 
                        <div key={index}>
                            <MarksTable marks={marks.get(subject)} subject={subject} />
                        </div>
                    )
                })}
            </div>
            <div className='end'></div>
        </>
    );
}

export default Marks;