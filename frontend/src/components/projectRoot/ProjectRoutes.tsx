import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Page} from "../../modules/Routes";
import Timetable from "../../pages/timetable/Timetable";
import Diary from "../../pages/diary/Diary";
import Notes from "../../pages/notes/Notes";
import Marks from "../../pages/marks/Marks";
import Absences from "../../pages/absences/Absences";
import Documents from "../../pages/documents/Documents";
import DiaryInfo from "../../pages/diaryInfo/DiaryInfo";
import About from "../../pages/about/About";
import EmptyAuditories from "../../pages/emptyAuditories/EmptyAuditories";
import Settings from "../../pages/settings/Settings";
import {getInitialPage} from "../../modules/getInitialPage";
import {isPWA} from "../../modules/IsPWA";
import Installation from "../installation/Installation";

const ProjectRoutes = () => {
    return (
        <Routes>
            <Route path={Page.Timetable} element={<Timetable/>}/>
            <Route path={Page.Diary} element={isPWA() ? <Diary /> : <Installation />}/>
            <Route path={Page.Notes} element={<Notes />}/>
            <Route path={Page.Marks} element={<Marks />}/>
            <Route path={Page.Absences} element={<Absences />}/>
            <Route path={Page.Documents} element={<Documents />}/>
            <Route path={Page.DiaryInfo} element={isPWA() ? <DiaryInfo /> : <Installation />}/>
            <Route path={Page.About} element={<About />}/>
            <Route path={Page.EmptyAuditories} element={<EmptyAuditories />}/>
            <Route path={Page.Settings} element={<Settings />}/>
            <Route
                path="*"
                element={<Navigate to={getInitialPage()} />}
            />
        </Routes>
    );
};

export default ProjectRoutes;