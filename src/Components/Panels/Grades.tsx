import React, {useEffect, useState} from "react";

import Options from "../Options"
import {setModalView} from "../../Modules/Effector/AppSettingsSrore";
import {withModalRootContext} from "@vkontakte/vkui";
import {setGrade, setIsTeacher} from '../../Modules/Effector/TimetableStore'
import {loadTimetable} from '../../Hooks/loadTimetable'

type IGrades = {
    updateModalHeight: () => void
}

const Grades = ({ updateModalHeight} : IGrades) => {
    const grades = {
        "8": ["8А", "8В"],
        "9": ["9А", "9Б", "9В", "9Г", "9Е"],
        "10": ["10А", "10Б", "10В", "10Г", "10Д", "10Е", "10З", "10К", "10Л", "10М", "10Н", "10С"],
        "11": ["11А", "11Б", "11В", "11Г", "10Д", "11Е", "11З", "11К", "11Л", "11М", "11Н", "11С"]
    };

    const [gradeName, setGradeName] = useState("");

    useEffect(()=> {
        if (gradeName != '') updateModalHeight()
    }, [gradeName])

    return (
        <>
            {gradeName === "" && <Options options={Object?.keys({...grades})} setOption={
                (option) => {
                    setTimeout(() => setGradeName(option), 100)
                }}/>}
            {gradeName !== "" && <Options options={Object.assign({...grades}[gradeName], [])} setOption={
                (grade) => {
                    setGrade(grade)
                    setModalView('')
                    setIsTeacher(false)
                    loadTimetable(grade)
                }}/>}
        </>
    );
}

export default withModalRootContext(Grades);