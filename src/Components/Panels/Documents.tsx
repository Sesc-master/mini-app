import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { IRootState } from "../../Modules/IRootState"
import { getDocuments } from "../../Modules/ScoleAPI";

const Documents = () => {
    const token = useSelector((state: IRootState) => state.token)
    const [documents, setDocuments] = useState([])

    useEffect(async () => {
        const {login, type} = JSON.parse(localStorage.getItem("loginData"))
        let documents = await getDocuments(login, token, type)
        setDocuments(documents)
    }, [])

    return (
        <>
            <h1 className="documents-header">Документы</h1>
            <div className="documents-content">
                {documents?.map((document, index) => (
                    <div key={index} className="documents-text">
                        {`Освобождение с ${document?.dateStart.split('-').join('.')} 
                        до ${document?.dateEnd.split('-').join('.')}`}
                    </div>
                ))}
            </div>
            <div className='end'></div>
        </>
    );
}

export default Documents;