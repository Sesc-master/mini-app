import React, {useEffect, useState, useLayoutEffect} from "react";
import "@vkontakte/vkui/dist/vkui.css";
import Navbar from "./Navbar";
import Timetable from "../pages/timetable/Timetable";
import AppHeader from "./AppHeader";
import Diary from "../pages/Diary";
import About from "../pages/About";
import Grades from "../pages/timetable/timetableModalPages/Grades";
import EmptyAuditories from "../pages/EmptyAuditories";
import Subjects from "../pages/Subjects"
import {
    ConfigProvider,
    AppRoot,
    Panel,
    SplitLayout,
    ModalRoot,
    ModalPage,
    AdaptivityProvider,
    ModalPageHeader,
    PanelHeaderButton
} from "@vkontakte/vkui";
import { Icon24Dismiss  } from '@vkontakte/icons';
import { getDiary } from '../modules/GetDiary'
import Notes from "../pages/Notes";
import Absences from "../pages/Absences";
import Marks from "../pages/Marks";
import DiaryInfo from "../pages/DiaryInfo";
import Documents from "../pages/Documents";
import {BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from 'react-router-dom'
import {Page} from "../modules/Routes";
import {Modal} from "../modules/Modal"
import {
    setDiary,
    setIsDiaryLoading,
    setIsLogin,
    setSubjects,
    setToken,
} from "../modules/effector/DiaryStore";
import {appSettingsStore, setScheme, setModalView, setNavbarItems} from "../modules/effector/AppSettingsSrore"
import {useStore} from "effector-react";
import {Role} from "../modules/scoleAPI/types/Role";
// @ts-ignore
import $ from "jquery"
import Settings from "../pages/Settings";
import {StorageKey} from "../modules/StorageKey";
import {Appearance} from "../modules/Appearance";
import {getInitialPage} from "../modules/getInitialPage";
import ShowInstaller from './ShowInstaller';
import Teachers from "../pages/timetable/timetableModalPages/Teachers";
import TimetableType from "../pages/timetable/timetableModalPages/TimetableType";
import {useLoadTimetable} from "../hooks/useLoadTimetable";
import {setGrade, setIsTeacher, setTeacher} from "../modules/effector/TimetableStore";


const ProjectRoot = () => {
    const {scheme, modalView} = useStore(appSettingsStore)

    useEffect(() => {
        if (localStorage.getItem(StorageKey.Login) !== null){
            const loginData : {login: string, password: string, type: Role} =
            JSON.parse(localStorage.getItem(StorageKey.Login) || "{}")
            setIsDiaryLoading(true)
            getDiary(loginData.login, loginData.password, loginData.type)
                .then((response : any) => {
                    if (response.journal){
                        setSubjects([...response.journal.keys()])
                        setDiary(response.journal)
                        setIsLogin(true)
                        setToken(response.token)
                    }
                    setIsDiaryLoading(false)
                })
                .catch(() => {
                    setIsDiaryLoading(false)
                })
        }
        if (localStorage.getItem(StorageKey.Scheme) !== null){
            const scheme = localStorage.getItem(StorageKey.Scheme) || "{}"
            setScheme(scheme)
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

    useLayoutEffect(() => {
        if (scheme === Appearance.Light && window.screen.width <= 700){
            $('body').css('background-color', 'white')
            $('div.scheme-color').css('background-color', 'white')
        }else if (scheme === Appearance.Light && window.screen.width > 700){
            $('body').css('background-color', '#ececec')
            $('div.scheme-color').css('background-color', 'white')
        }else if ((scheme === Appearance.Dark) && window.screen.width <= 700){
            $('body').css('background-color', '#19191a')
            $('div.scheme-color').css('background-color', '#19191a')
        }else if ((scheme === Appearance.Dark) && window.screen.width > 700){
            $('body').css('background-color', 'black')
            $('div.scheme-color').css('background-color', '#19191a')
        }
    }, [scheme])

    const modal = (
        <ModalRoot activeModal={modalView} onClose={() => setModalView('')}>
            <ModalPage id={Modal.Subjects}>
                <ModalPageHeader  left={
                    <PanelHeaderButton onClick={() => setModalView('')}>
                        <Icon24Dismiss  />
                    </PanelHeaderButton>}>Выберите предмет</ModalPageHeader>
                <Subjects />
            </ModalPage>
            <ModalPage id={Modal.Grades}  dynamicContentHeight={true}>
                <ModalPageHeader  left={
                    <PanelHeaderButton onClick={() => setModalView('')}>
                        <Icon24Dismiss  />
                    </PanelHeaderButton>}>Класс</ModalPageHeader>
                <Grades />
            </ModalPage>
            <ModalPage id={Modal.Teachers} dynamicContentHeight={true}>
                <ModalPageHeader  left={
                    <PanelHeaderButton onClick={() => setModalView('')}>
                        <Icon24Dismiss  />
                    </PanelHeaderButton>}>Учитель</ModalPageHeader>
                <Teachers />
            </ModalPage>
            <ModalPage id={Modal.Type}>
                <ModalPageHeader  left={
                    <PanelHeaderButton onClick={() => setModalView('')}>
                        <Icon24Dismiss  />
                    </PanelHeaderButton>}>Тип расписания</ModalPageHeader>
                <TimetableType />
            </ModalPage>
        </ModalRoot>
    );

    return (
        // @ts-ignore
        <ConfigProvider scheme={scheme}>
            <AdaptivityProvider>
            <AppRoot>
                <SplitLayout modal={modal}>
                    <Router>
                        <Panel>
                            <AppHeader/>
                            <Navbar/>
                            <div className="panel scheme-color">
                                <Routes>
                                    <Route path={Page.Timetable} element={<Timetable/>}/>
                                    <Route path={Page.Diary} element={ShowInstaller(<Diary /> )}/>
                                    <Route path={Page.Notes} element={<Notes />}/>
                                    <Route path={Page.Marks} element={<Marks />}/>
                                    <Route path={Page.Absences} element={<Absences />}/>
                                    <Route path={Page.Documents} element={<Documents />}/>
                                    <Route path={Page.DiaryInfo} element={ShowInstaller(<DiaryInfo />)}/>
                                    <Route path={Page.About} element={<About />}/>
                                    <Route path={Page.EmptyAuditories} element={<EmptyAuditories />}/>
                                    <Route path={Page.Settings} element={<Settings />}/>
                                    <Route
                                        path="*"
                                        element={<Navigate to={getInitialPage()} />}
                                    />
                                </Routes>
                            </div>
                        </Panel>
                    </Router>
                </SplitLayout>
            </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default ProjectRoot;