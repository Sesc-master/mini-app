import React, {useState, useEffect, useRef, useMemo} from "react";
import {getAbsences, getDocuments} from "../../../modules/scoleAPI/ScoleAPI";
import {useStore} from "effector-react";
import {diaryStore} from "../../../modules/effector/DiaryStore";
import {StorageKey} from "../../../modules/StorageKey";
import "./Absences.scss"
import Loading from "../../../components/loading/Loading";
import styles from "../marks/marksTable/MarksTable.module.scss";
import Absence from "../../../modules/scoleAPI/absence/Absence";

const Absences = () : JSX.Element => {
    const [absences, setAbsences] = useState<Map<string, any> | undefined>()
    const {token} = useStore(diaryStore)
    const [documents, setDocuments] = useState<any[] | undefined>();

    const summary = useMemo(() => {
            if (!absences || !documents) return undefined;

            const absence = new Absence(absences, documents);
            console.log(absence.getSummary())
            return absence.getSummary();
    }, [absences, documents])

    const setAbsencesData = async () => {
        try {
            const {login, type} = JSON.parse(localStorage.getItem(StorageKey.Login) || '{}')
            const absences = new Map(await getAbsences(login, token, type) || [])
            setDocuments(await getDocuments(login, token, type))
            await setAbsences(absences)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (token) setAbsencesData()
    }, [token])

    return (
        <>
            {!absences && <Loading />}
            {absences &&

                <div className="absences-content">
                    <div className={styles.main}>
                        <h4 className={styles.subject}>Все пропуски</h4>
                        <div className={styles.flex}>
                            {summary.map((event : any, index: number) => {
                                return (
                                    <div key={index} className={styles.cell}>
                                        <div className={styles.cellItem}>{event.name}</div>
                                        <div className={styles.cellItem}>{event.all}</div>
                                        <h4 className={styles.cellItem} style={{color: "red"}}>{event.skiped}</h4>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "row", margin: "0.4em"}}>
                        <circle style={{width: "1em", height: "1em", backgroundColor: "red", borderRadius: "50%"}}></circle>
                        <h5 style={{margin: 0}}>- без уважительной причины</h5>
                    </div>
                    {Array.from(absences?.keys())?.map((subject) => (
                        <div className='absences-absence'>
                            <div className="absences-subject">{subject}</div>
                            <div className="absences-dates">
                                {absences.get(subject)?.map((absence : any) => `${absence.date} `)}
                            </div>
                        </div>
                    ))}
            </div>}
        </>
    );
}

export default Absences;