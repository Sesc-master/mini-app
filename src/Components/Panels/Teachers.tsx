import React, {useEffect, useState} from "react";
import Options from "../Options";
import {withModalRootContext} from '@vkontakte/vkui'
import getIDs from "../../Modules/GetIDs";
import {setModalView} from "../../Modules/Effector/AppSettingsSrore";
import {setTeacher, setIsTeacher} from "../../Modules/Effector/TimetableStore";
import Loading from "../Loading";
import {loadTimetable} from "../../Hooks/loadTimetable";

const Teachers = (props: {updateModalHeight: () => void}) => {
    const [teachers, setTeachers] = useState<string []>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        getIDs()
             .then((ids) =>{
                 setIsLoading(false);
                 setTeachers(Array.from(ids.teachers.keys()));
                 props.updateModalHeight();
             })
        }, [])

    return (
        <>
            <Options options={teachers} setOption={(teacher) => {
                setModalView('')
                setTeacher(teacher)
                setIsTeacher(true)
                loadTimetable(teacher, true)
            }}/>
            {isLoading && <Loading />}
        </>
    );
}

export default withModalRootContext(Teachers);