import React, {useEffect, useState} from "react";
import Options from "../../../components/options/Options";
import {withModalRootContext} from '@vkontakte/vkui'
import {setModalView} from "../../../modules/effector/AppSettingsSrore";
import {setTeacher, setIsTeacher} from "../../../modules/effector/TimetableStore";
import Loading from "../../../components/loading/Loading";
import {useLoadTimetable} from "../../../hooks/useLoadTimetable";

const Teachers = (props: {updateModalHeight: () => void}) => {
    const [teachers, setTeachers] = useState<string []>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setIsLoading(true)
        fetch("/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({query: "{ getTeachers }"})
        })
            .then(response => response.json())
            .then(response => {
                setIsLoading(false);
                setTeachers(response.data.getTeachers);
                props.updateModalHeight();
            });
    }, []);

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