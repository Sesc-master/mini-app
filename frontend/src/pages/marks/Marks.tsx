import React, { useState, useEffect } from "react";
import {getReportCard} from "../../modules/scoleAPI/ScoleAPI";
import MarksTable from "../../components/marksTable/MarksTable";
import {useStore} from "effector-react";
import {diaryStore} from "../../modules/effector/DiaryStore";
import {StorageKey} from "../../modules/StorageKey";


const Marks = () => {
    const {token} = useStore(diaryStore)
    const {login, type} = JSON.parse(localStorage.getItem(StorageKey.Login) || '{}')
    const [marks, setMarks] = useState<Map<string, any>>(new Map())

    const setMarksData = async () => {
        const marks = new Map(await getReportCard(login, token, type) || [])
        setMarks(marks)
    }

    useEffect(() => {
        setMarksData()
    }, [])

    return (
        <>
            <h1 className='marks-header'>Табель</h1>
            <div className='marks-content'>
                {Array.from(marks?.keys())?.map((subject : any, index) => {
                    return ( 
                        <div key={index}>
                            <MarksTable marks={marks?.get(subject)} subject={subject} />
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default Marks;