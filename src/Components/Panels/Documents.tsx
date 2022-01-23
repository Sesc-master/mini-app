import React, { useState, useEffect } from "react";
import { getDocuments } from "../../Modules/ScoleAPI";
import {useStore} from "effector-react";
import {diaryStore} from "../../Modules/Effector/DiaryStore";

const Documents = () => {
    const {token} = useStore(diaryStore)
    const [documents, setDocuments] = useState<Array<any>>([])

    const setDocumentsData = async () => {
        const {login, type} = JSON.parse(localStorage.getItem("loginData") || '{}')
        let documents = await getDocuments(login, token, type)
        setDocuments(documents || [])
    }

    useEffect(() => {
        setDocumentsData()
    }, [])

    return (
        <>
            <h1 className="documents-header">Документы</h1>
            <div className="documents-content">
                {documents?.map((document, index) => (
                    <div key={index} className="documents-text">
                        {`Освобождение с ${document?.dateStart?.split('-').join('.')} 
                        до ${document?.dateEnd?.split('-').join('.')}`}
                    </div>
                ))}
            </div>
            <div className='end'></div>
        </>
    );
}

export default Documents;