import React, {useEffect, useState} from "react";
import Options from "../../../components/options/Options";
import {withModalRootContext} from '@vkontakte/vkui'
import getIDs from "../../../modules/GetIDs";
import {setModalView} from "../../../modules/effector/AppSettingsSrore";
import {setTeacher, setIsTeacher} from "../../../modules/effector/TimetableStore";
import Loading from "../../../components/loading/Loading";
import {useLoadTimetable} from "../../../hooks/useLoadTimetable";

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
                useLoadTimetable("", teacher, true)
            }}/>
            {isLoading && <Loading />}
        </>
    );
}

export default withModalRootContext(Teachers);