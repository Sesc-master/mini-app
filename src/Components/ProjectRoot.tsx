import React, {useEffect, useState, useLayoutEffect} from "react";
import "@vkontakte/vkui/dist/vkui.css";
import Navbar from "./Navbar";
import Timetable from "./Panels/Timetable";
import AppHeader from "./AppHeader";
import Diary from "./Panels/Diary";
import About from "./Panels/About";
import Grades from "./Panels/Grades";
import EmptyAuditories from "./Panels/EmptyAuditories";
import Subjects from "./Panels/Subjects"
import {
    View,
    ConfigProvider,
    AppRoot,
    Panel,
    SplitLayout,
    ModalRoot,
    ModalPage,
    AdaptivityProvider,
    ModalPageHeader,
    Text,
    Group
} from "@vkontakte/vkui";
import { withModalRootContext } from "@vkontakte/vkui";
import { getDiary } from '../Modules/GetDiary'
import Notes from "./Panels/Notes";
import Absences from "./Panels/Absences";
import Marks from "./Panels/Marks";
import DiaryInfo from "./Panels/DiaryInfo";
import Documents from "./Panels/Documents";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import {Page} from "../Modules/Routes";
import {Modal} from "../Modules/Modal"
import {
    setDiary,
    setIsDiaryLoading,
    setIsLogin,
    setSubjects,
    setToken,
} from "../Modules/Effector/DiaryStore";
import {appSettingsStore, setScheme, setModalView} from "../Modules/Effector/AppSettingsSrore"
import {useStore} from "effector-react";
import {Role} from "../Modules/ScoleAPI/types/Role";
import $ from "jquery"
import Installation from "./Panels/Installation";

const ProjectRoot = () => {
    const {scheme, modalView} = useStore(appSettingsStore)

    useEffect(() => {
        if (localStorage.getItem('loginData') !== null){
            const loginData : {login: string, password: string, type: Role} =
            JSON.parse(localStorage.getItem('loginData') || "{}")
            setIsDiaryLoading(true)
            getDiary(loginData.login, loginData.password, loginData.type)
                .then((response) => {
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
        if (localStorage.getItem("scheme") !== null){
            const scheme = localStorage.getItem("scheme") || "{}"
            setScheme(scheme)
        }

    }, [])

    useLayoutEffect(() => {
        if (scheme === 'client_light' && window.screen.width <= 700){
            $('body').css('background-color', 'white')
            $('div.scheme-color').css('background-color', 'white')
        }else if (scheme === 'client_light' && window.screen.width > 700){
            $('body').css('background-color', '#ececec')
            $('div.scheme-color').css('background-color', 'white')
        }else if ((scheme === "space_gray" || scheme === 'client_dark') && window.screen.width <= 700){
            $('body').css('background-color', '#19191a')
            $('div.scheme-color').css('background-color', '#19191a')
        }else if ((scheme === "space_gray" || scheme === 'client_dark') && window.screen.width > 700){
            $('body').css('background-color', 'black')
            $('div.scheme-color').css('background-color', '#19191a')
        }
    }, [scheme])

    const modal = (
        <ModalRoot activeModal={modalView} onClose={() => setModalView('')}>
            <ModalPage id={Modal.Subjects}>
                <ModalPageHeader>Выберите предмет</ModalPageHeader>
                <Subjects />
            </ModalPage>
            <ModalPage id={Modal.Grades} dynamicContentHeight={true}>
                <ModalPageHeader>Выберите Класс</ModalPageHeader>
                <Grades />
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
                                    <Route path={Page.Diary} element={<Diary />}/>
                                    <Route path={Page.Notes} element={<Notes />}/>
                                    <Route path={Page.Marks} element={<Marks />}/>
                                    <Route path={Page.Absences} element={<Absences />}/>
                                    <Route path={Page.Documents} element={<Documents />}/>
                                    <Route path={Page.DiaryInfo} element={<DiaryInfo />}/>
                                    <Route path={Page.About} element={<About />}/>
                                    <Route path={Page.EmptyAuditories} element={<EmptyAuditories />}/>
                                    <Route path={Page.Installation} element={<Installation />}/>
                                    <Route
                                        path="*"
                                        element={<Navigate to={Page.About} />}
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