import React, {useState, useEffect, EffectCallback} from "react";
import { getAbsences} from "../modules/ScoleAPI";
import {useStore} from "effector-react";
import {diaryStore} from "../modules/effector/DiaryStore";
import {StorageKey} from "../modules/StorageKey";


const Absences = () : JSX.Element => {
    const [absences, setAbsences] = useState(new Map())
    const [summary, setSummary] = useState(0)
    const {token} = useStore(diaryStore)

    const getSummary = (absences: Map<string, any>) => {
        let counter = 0
        Array.from(absences?.keys()).forEach(subject => {
            counter += absences?.get(subject)?.length ?? 0
        });
        return counter
    }

    const setAbsencesData = async () => {
        try {
            const {login, type} = JSON.parse(localStorage.getItem(StorageKey.Login) || '{}')
            const absences = new Map(await getAbsences(login, token, type) || [])
            setAbsences(absences)
            setSummary(getSummary(absences))
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        setAbsencesData()
    }, [])

    return (
        <>
            <h1 className="absences-header">Пропуски</h1>
            <div className="absences-content">
                {Array.from(absences?.keys())?.map((subject) => (
                    <div className='absences-absence'>
                        <div className="absences-subject">{subject}</div>
                        <div className="absences-dates">
                            {absences.get(subject)?.map((absence : any) => `${absence.date} `)}
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