import React, {useEffect, useState} from "react";
import Options from "../../../components/options/Options";
import {setModalView} from "../../../modules/effector/AppSettingsSrore";
import {setTeacher, setIsTeacher} from "../../../modules/effector/TimetableStore";
import Loading from "../../../components/loading/Loading";
import {useLoadTimetable} from "../../../hooks/useLoadTimetable";
import getTeachers from "../../../modules/schedule/api/getTeachers";

const Teachers = () => {
    const [teachers, setTeachers] = useState<string []>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)

        getTeachers()
            .then(teachers => {
                setIsLoading(false);
                setTeachers(teachers);
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

export default Teachers;