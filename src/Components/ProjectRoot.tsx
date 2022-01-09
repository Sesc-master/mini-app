
import React, {useEffect} from 'react';

import '@vkontakte/vkui/dist/vkui.css';
import Navbar from './Navbar';
import Timetable from './Panels/Timetable';
import AppHeader from './AppHeader';
import Diary from './Panels/Diary';
import About from './Panels/About';
import Grades from './Panels/Grades';
import EmptyAuditories from "./Panels/EmptyAuditories";
import Subjects from './Panels/Subjects'
import { IRootState } from '../Modules/IRootState';
import {ConfigProvider, AppRoot, Root, View, Panel, SSRWrapper} from "@vkontakte/vkui";
import {useDispatch, useSelector} from 'react-redux'
// import '../../public/Styles/Option.css'

type ISetOptions = (option: string) => void;

type IProjectRoot = {
    grade: string,
    setActiveView: (view: string) => void,
    setGrade: (grade: string) => void,
    activeView: string
}



const ProjectRoot = ({grade, setActiveView, activeView, setGrade}: IProjectRoot) => {
    const dispatch = useDispatch() 
    let isLoaded = useSelector((state : IRootState) => state.isJournalLoaded)
    const localStorageLogin = useSelector((state : IRootState) => state.localStorageLogin)

    const setSubjects = (subjects : string[]) => {
        dispatch({type: "SET_SUBJECTS", payload: subjects})
    }

    const setJournal = (journal : {}) => {
        dispatch({type: "SET_JOURNAL", payload: journal})
    }

    const setIsJournalLoaded = (isLoaded : boolean) => {
        dispatch({type: "SET_IS_JOURNAL_LOADED", payload: isLoaded})
    }
    // const subjects = isJournalLoaded ? Object.keys(loginResponse.journal) : []
    const getJournal = (login : string, password : string, type : string) => {
        return fetch('/api/journal', {
            method: 'POST',
            body: JSON.stringify({login, password, type})
        })
            .then((response) => response.json())
            .then((response) => {
                return response;
            })
    }

    useEffect(() => {
        if (localStorage.getItem(localStorageLogin) !== null){
            const loginData : {login: string, password: string, type: string} = 
            JSON.parse(localStorage.getItem(localStorageLogin) || '{}')

            getJournal(loginData.login, loginData.password, loginData.type)
                .then((response) => {
                    if (response.journal){
                        setSubjects(Object.keys(response.journal))
                        setJournal(response.journal)
                        setIsJournalLoaded(true)
                    }
                })
        }

    }, [])

    return (
        <>
            <AppRoot >
                <Navbar setActiveView={(view) => setActiveView(view)}/>
                <Root activeView={activeView}>
                    <View id="time-table" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Timetable grade={grade} setActiveView={() => setActiveView('grades')}/>
                        </Panel>
                    </View>
                    <View id="register" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Diary setActiveViewSubjects={() => setActiveView('subjects')}/>
                        </Panel>
                    </View>
                    <View id="settings" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <About setActiveView={() => setActiveView('empty-cabinet')}/>
                        </Panel>
                    </View>
                    <View id="grades" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Grades setGrade={setGrade} setActiveView={() => setActiveView('time-table')}/>
                        </Panel>
                    </View>
                    <View id="empty-cabinet" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <EmptyAuditories setActiveView={() => setActiveView('settings')}/>
                        </Panel>
                    </View>
                    <View id="subjects" activePanel="panel">
                        <Panel id='panel'>
                            <AppHeader/>
                            <Subjects setActiveViewDiary={() => setActiveView("register")}/>
                        </Panel>
                    </View>
                </Root>
            </AppRoot>
        </>
    );
}

export default ProjectRoot;