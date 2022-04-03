import React, {useEffect, useLayoutEffect} from "react";
import "@vkontakte/vkui/dist/vkui.css";
import Navbar from "../navbar/Navbar";
import AppHeader from "../appHeader/AppHeader";
import Grades from "../../pages/timetable/timetableModalPages/Grades";
import Subjects from "../../pages/subjects/Subjects"
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
import { getDiary } from '../../modules/GetDiary'
import {BrowserRouter as Router} from 'react-router-dom'
import {Modal} from "../../modules/Modal"
import {
    setDiary,
    setIsDiaryLoading,
    setIsLogin,
    setSubjects,
    setToken,
} from "../../modules/effector/DiaryStore";
import {appSettingsStore, setScheme, setModalView, setNavbarItems} from "../../modules/effector/AppSettingsSrore"
import {useStore} from "effector-react";
import {Role} from "../../modules/scoleAPI/types/Role";
// @ts-ignore
import $ from "jquery"
import {StorageKey} from "../../modules/StorageKey";
import {Appearance} from "../../modules/Appearance";
import Teachers from "../../pages/timetable/timetableModalPages/Teachers";
import TimetableType from "../../pages/timetable/timetableModalPages/TimetableType";
import {useLoadTimetable} from "../../hooks/useLoadTimetable";
import {setGrade, setIsTeacher, setTeacher} from "../../modules/effector/TimetableStore";
import ProjectRoutes from "./ProjectRoutes";
import {useLoadDiary} from "../../hooks/useLoadDiary";

const ProjectRoot = () => {
    const {scheme, modalView} = useStore(appSettingsStore);

    useEffect(() => {
        if (localStorage.getItem(StorageKey.Login) !== null){
            const {login, password, type} =
                JSON.parse(localStorage.getItem(StorageKey.Login) || "{}")
            setIsDiaryLoading(true)
            useLoadDiary(login, password, type);
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
            $('.scheme-color').css('background-color', 'white')
        }else if (scheme === Appearance.Light && window.screen.width > 700){
            $('body').css('background-color', '#ececec')
            $('.scheme-color').css('background-color', 'white')
        }else if ((scheme === Appearance.Dark) && window.screen.width <= 700){
            $('body').css('background-color', '#19191a')
            $('.scheme-color').css('background-color', '#19191a')
        }else if ((scheme === Appearance.Dark) && window.screen.width > 700){
            $('body').css('background-color', 'black')
            $('.scheme-color').css('background-color', '#19191a')
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
                    <Panel>
                        <Router>
                            <AppHeader/>
                            <Navbar/>
                            <section className="panel scheme-color">
                                <ProjectRoutes />
                                <div className="end"/>
                            </section>
                        </Router>
                    </Panel>
                </SplitLayout>
            </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default ProjectRoot;