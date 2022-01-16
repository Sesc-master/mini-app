import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { IRootState } from "../../Modules/IRootState"
import { getNotes } from "../../Modules/ScoleAPI";
import TextWithLinks from "../TextWithLinks";

const Notes = () => {
    const token = useSelector((state: IRootState) => state.token)
    const localStorageLogin = useSelector((state: IRootState) => state.localStorageLogin)
    const {login, type} = JSON.parse(localStorage.getItem(localStorageLogin))
    const [notes, setNotes] = useState([])

    useEffect(async () => {
        let notes = await getNotes(login, token, type)
        notes?.sort((a, b) => {
            return Number(a.date.split(" ")[0]) - Number(b.date.split(" ")[0])
        })
        setNotes(notes)
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