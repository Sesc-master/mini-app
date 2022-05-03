import React, {useEffect,} from "react";
import Navbar from "../navbar/Navbar";
import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router} from 'react-router-dom'
import {Modal} from "../../modules/Modal"
import {setIsDiaryLoading,} from "../../modules/effector/DiaryStore";
import {setNavbarItems} from "../../modules/effector/AppSettingsSrore"
import {StorageKey} from "../../modules/StorageKey";
import {useLoadTimetable} from "../../hooks/useLoadTimetable";
import {setGrade, setIsTeacher, setTeacher} from "../../modules/effector/TimetableStore";
import ProjectRoutes from "./ProjectRoutes";
import {useLoadDiary} from "../../hooks/useLoadDiary";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ModalPage from "../modalPage/ModalPage";
import Grades from "../../pages/schedule/scheduleModalPages/Grades";
import Subjects from "../../pages/subjects/Subjects";
import ScheduleType from "../../pages/schedule/scheduleModalPages/ScheduleType";
import Teachers from "../../pages/schedule/scheduleModalPages/Teachers";
import Box from "@mui/material/Box";


const ProjectRoot = () => {

    useEffect(() => {
        if (localStorage.getItem(StorageKey.Login) !== null){
            const {login, password, type} =
                JSON.parse(localStorage.getItem(StorageKey.Login) || "{}")
            setIsDiaryLoading(true)
            useLoadDiary(login, password, type);
        }

        if (localStorage.getItem(StorageKey.NavbarItems) !== null){
            const navbarItems : any = JSON.parse(localStorage.getItem(StorageKey.NavbarItems) || "{}")
            setNavbarItems(navbarItems)
        }

        if (localStorage.getItem(StorageKey.Timetable) !== null) {
            const {teacher, grade, isTeacher} = JSON.parse(localStorage.getItem(StorageKey.Timetable) || "{}");
            setTeacher(teacher);
            setGrade(grade);
            setIsTeacher(isTeacher);
            useLoadTimetable(grade, teacher, isTeacher);
        }
    }, [])

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <Router>
            <ThemeProvider theme={darkTheme}>
                <AppHeader/>
                <Navbar/>
                <Box className="panel">
                    <ProjectRoutes />
                    <div className="end"/>
                </Box>
                <ModalPage name={Modal.Grades}>
                    <Grades />
                </ModalPage>
                <ModalPage name={Modal.Subjects}>
                    <Subjects />
                </ModalPage>
                <ModalPage name={Modal.Type}>
                    <ScheduleType />
                </ModalPage>
                <ModalPage name={Modal.Teachers}>
                    <Teachers />
                </ModalPage>
            </ThemeProvider>
        </Router>
    );
}

export default ProjectRoot;