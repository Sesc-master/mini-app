import React, { useState, useEffect } from "react";
import {useSelector} from "react-redux"
import { IRootState } from "../../Modules/IRootState"
import { getAbsences} from "../../Modules/ScoleAPI";


const Absences = () => {
    const [absences, setAbsences] = useState(new Map())
    const [summary, setSummary] = useState(0)
    const token = useSelector((state: IRootState) => state.token)
    const localStorageLogin = useSelector((state: IRootState) => state.localStorageLogin)

    const getSummary = (absences) => {
        let counter = 0
        Array.from(absences?.keys()).forEach(subject => {
            counter += absences.get(subject).length
        });
        return counter
    }

    useEffect(async () => {
        try {
            const {login, type} = JSON.parse(localStorage.getItem(localStorageLogin))
            const absences = new Map(await getAbsences(login, token, type))
            console.log(login, type, token)
            setAbsences(absences)
            setSummary(getSummary(absences))
        } catch(err) {
            console.log(err)
        }
    }, [])

    return (
        <>
            <h1 className="absences-header">Пропуски</h1>
            <div className="absences-content">
                {[...absences?.keys()]?.map((subject) => (
                    <div className='absences-absence'>
                        <div className="absences-subject">{subject}</div>
                        <div className="absences-dates">
                            {absences.get(subject)?.map((absence) => `${absence.date} `)}
                        </div>
                    </div>
                ))}
            </div>
            <h3 className="absences-summary">
                {`Всего: ${summary}`}
            </h3>
            <div className='end'></div>
        </>
    );
}

export default Absences;