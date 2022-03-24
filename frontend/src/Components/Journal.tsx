import React from "react";
import {Div, FormItem, SelectMimicry} from "@vkontakte/vkui";
import Task from "./Task";
import {Modal} from "../Modules/Modal";
import {setModalView} from "../Modules/Effector/AppSettingsSrore";
import {diaryStore} from "../Modules/Effector/DiaryStore";
import {useStore} from "effector-react"

const Journal = () => {
    const {diary, targetSubject} = useStore(diaryStore)
    const teacher = diary.get(targetSubject)?.teacher
    const notes = diary.get(targetSubject)?.notes


    return (
        <>
            <FormItem top="Выберите предмет">
                <SelectMimicry
                    placeholder="Не выбран"
                    onClick={() => setModalView(Modal.Subjects)}
                >{!!targetSubject && `${targetSubject}. ${teacher}`}</SelectMimicry>
            </FormItem>
            {notes !== undefined && [...notes]?.map((note, index) => 
            (<div className="journal-task" key={index}>
                <Task date={note.date} topic={note.theme} homework={note.hometask} weight={note.coefficient} mark={note.grades}/>
            </div>
            ))}
            <Div className='end'></Div>
        </>
    )
}

export default Journal