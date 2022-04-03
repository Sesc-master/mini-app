import React from "react";
import {FormItem, SelectMimicry, Div} from "@vkontakte/vkui";
import Task from "../task/Task";
import {Modal} from "../../modules/Modal";
import {setModalView} from "../../modules/effector/AppSettingsSrore";
import {diaryStore} from "../../modules/effector/DiaryStore";
import {useStore} from "effector-react"
import styles from "./Journal.module.scss"

const Journal = () => {
    const {diary, targetSubject} = useStore(diaryStore)
    const teacher = diary.get(targetSubject)?.teacher
    const notes = diary.get(targetSubject)?.notes


    return (
        <div className="content">
            <SelectMimicry
                placeholder="предмет не выбран"
                onClick={() => setModalView(Modal.Subjects)}
            >{!!targetSubject && `${targetSubject}. ${teacher}`}</SelectMimicry>
            {notes !== undefined && [...notes]?.map((note, index) => 
            (<div className={styles.task} key={index}>
                <Task date={note.date} topic={note.theme} homework={note.hometask} weight={note.coefficient} mark={note.grades}/>
            </div>
            ))}
        </div>
    )
}

export default Journal