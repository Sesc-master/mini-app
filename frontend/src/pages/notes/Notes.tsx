import React, { useState, useEffect } from "react";
import { getNotes } from "../../modules/ScoleAPI";
import TextWithLinks from "../../components/textWithLinks/TextWithLinks";
import {useStore} from "effector-react";
import {diaryStore} from "../../modules/effector/DiaryStore";
import {StorageKey} from "../../modules/StorageKey";

const Notes = () => {
    const {token} = useStore(diaryStore)
    const {login, type} = JSON.parse(localStorage.getItem(StorageKey.Login) || '{}')
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
        </>
    );
}

export default Notes;