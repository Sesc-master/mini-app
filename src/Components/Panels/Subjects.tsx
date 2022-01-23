import React from "react";
import Options from "../Options";
import {setTargetSubject, diaryStore} from "../../Modules/Effector/DiaryStore";
import {setModalView} from "../../Modules/Effector/AppSettingsSrore";
import {useStore} from "effector-react";

const Subjects = () => {
    const {subjects} = useStore(diaryStore)

    return (
        <>
            <Options options={subjects} setOption={(subject) => {
                setTargetSubject(subject)
                setModalView('')
            }}/>
        </>
    );
}

export default Subjects;