import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { getNotes } from "../../Modules/ScoleAPI";
import TextWithLinks from "../TextWithLinks";
import {useStore} from "effector-react";
import {diaryStore} from "../../Modules/Effector/DiaryStore";

const Notes = () => {
    const {token} = useStore(diaryStore)
    const {login, type} = JSON.parse(localStorage.getItem("loginData") || '{}')
    const [notes, setNotes] = useState<Array<any>>([])

    const setNotesData = async () => {
        let notes = await getNotes(login, token, type) || []
        notes?.sort((a, b) => {
            return Number(a.date.split(" ")[0]) - Number(b.date.split(" ")[0])
        })
        setNotes(notes)
    }

    useEffect( () => {
        setNotesData()
    }, [])

    return (
        <>
            <h1 className="notes-header">Заметки</h1>
            <div className="notes-content">
                {notes.map((note, index) => (
                    <div key={index} className="notes-note">
                        <div className="notes-author">{note.author}</div>
                        <div className="notes-text">
                            <TextWithLinks str={note.text}/>
                        </div>
                    </div>
                ))}
            </div>
            <div className='end'></div>
        </>
    );
}

export default Notes;