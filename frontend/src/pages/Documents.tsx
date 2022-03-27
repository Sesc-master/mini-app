import React, { useState, useEffect } from "react";
import { getDocuments } from "../modules/ScoleAPI";
import {useStore} from "effector-react";
import {diaryStore} from "../modules/effector/DiaryStore";
import {StorageKey} from "../modules/StorageKey";


const Documents = () => {
    const {token} = useStore(diaryStore)
    const [documents, setDocuments] = useState<Array<any>>([])

    const setDocumentsData = async () => {
        const {login, type} = JSON.parse(localStorage.getItem(StorageKey.Login) || '{}')
        let documents = await getDocuments(login, token, type)
        setDocuments(documents || [])
    }

    useEffect(() => {
        setDocumentsData()
    }, [])

    return (
        <>
            <h1 className="documents-header">Справки</h1>
            <div className="documents-content">
                {documents?.map((document, index) => (
                    <div key={index} className="documents-text">
                        {`Освобождение с ${document?.dateStart?.split('-').join('.')} 
                        до ${document?.dateEnd?.split('-').join('.')}`}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Documents;