import React, {useEffect, useState} from "react";
import "@vkontakte/vkui/dist/vkui.css";
import Navbar from "./Navbar";
import Timetable from "./Panels/Timetable";
import AppHeader from "./AppHeader";
import Diary from "./Panels/Diary";
import About from "./Panels/About";
import Grades from "./Panels/Grades";
import EmptyAuditories from "./Panels/EmptyAuditories";
import Subjects from "./Panels/Subjects"
import { IRootState } from "../Modules/IRootState";
import {ConfigProvider, AppRoot, Root, View, Panel} from "@vkontakte/vkui";
import {useDispatch, useSelector} from "react-redux"
import { getDiary } from '../Modules/GetDiary'
import Notes from "./Panels/Notes";
import Absences from "./Panels/Absences";
import Marks from "./Panels/Marks";
import DiaryInfo from "./Panels/DiaryInfo";
import Documents from "./Panels/Documents";
// import '../../public/Styles/Option.css'

type ISetOptions = (option: string) => void;

const ProjectRoot = () => {
    const [activeView, setActiveView] = useState("time-table")
    const [grade, setGrade] = useState<string>("")
    const dispatch = useDispatch() 
    // let isLoaded = useSelector((state : IRootState) => state.isJournalLoaded)
    const scheme = useSelector((state: IRootState) => state.scheme)

    const setToken = (token: string) => {
        dispatch({type: "SET_TOKEN", payload: token})
    }

    const setScheme = (scheme : string) => {
        dispatch({type: "SET_SCHEME", payload: scheme})
    }

    const setSubjects = (subjects : string[]) => {
        dispatch({type: "SET_SUBJECTS", payload: subjects})
    }

    const setJournal = (journal : {}) => {
        dispatch({type: "SET_JOURNAL", payload: journal})
    }

    const setIsLogin = (isLogin : boolean) => {
        dispatch({type: "SET_IS_LOGIN", payload: isLogin})
    }

    const setIsJournalLoading = (isLoading : boolean) => {
        dispatch({type: "SET_IS_JOURNAL_LOADING", payload: isLoading})
    }
    // const subjects = isJournalLoaded ? Object.keys(loginResponse.journal) : []

    useEffect(() => {
        if (localStorage.getItem('loginData') !== null){
            const loginData : {login: string, password: string, type: string} = 
            JSON.parse(localStorage.getItem('loginData') || "{}")
            setIsJournalLoading(true)
            getDiary(loginData.login, loginData.password, loginData.type)
                .then((response) => {
                    if (response.journal){
                        setSubjects([...response.journal.keys()])
                        setJournal(response.journal)
                        setIsLogin(true)
                        setToken(response.token)
                    }
                    setIsJournalLoading(false)
                })
                .catch(() => {
                    setIsJournalLoading(false)
                })
        }
        if (localStorage.getItem("scheme") !== null){
            const scheme = localStorage.getItem("scheme") || "{}"
            setScheme(scheme)
        }

    }, [])

    return (
        <ConfigProvider scheme={scheme}>
            <AppRoot >
                <Navbar setActiveView={(view) => setActiveView(view)}/>
                <Root activeView={activeView}>
                    <View id="time-table" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Timetable grade={grade} setActiveView={() => setActiveView("grades")}/>
                        </Panel>
                    </View>
                    <View id="register" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Diary setActiveViewSubjects={() => setActiveView("subjects")}/>
                        </Panel>
                    </View>
                    <View id="settings" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <About setActiveView={setActiveView}/>
                        </Panel>
                    </View>
                    <View id="grades" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Grades setGrade={setGrade} setActiveView={() => setActiveView("time-table")}/>
                        </Panel>
                    </View>
                    <View id="empty-cabinet" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <EmptyAuditories setActiveView={() => setActiveView("settings")}/>
                        </Panel>
                    </View>
                    <View id="subjects" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Subjects setActiveViewDiary={() => setActiveView("register")}/>
                        </Panel>
                    </View>
                    <View id="notes" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Notes/>
                        </Panel>
                    </View>
                    <View id="absences" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Absences/>
                        </Panel>
                    </View>
                    <View id="marks" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Marks/>
                        </Panel>
                    </View>
                    <View id="diary-info" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <DiaryInfo setActiveView={setActiveView}/>
                        </Panel>
                    </View>
                    <View id="documents" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Documents/>
                        </Panel>
                    </View>
                </Root>
            </AppRoot>
        </ConfigProvider>
    );
}

export default ProjectRoot;