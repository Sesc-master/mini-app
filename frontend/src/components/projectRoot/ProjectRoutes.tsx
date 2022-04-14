import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Page} from "./Page";
import Timetable from "../../pages/timetable/Timetable";
import Diary from "../../pages/diary/Diary";
import Notes from "../../pages/diary/notes/Notes";
import Marks from "../../pages/diary/marks/Marks";
import SkippedLessons from "../../pages/diary/skipedLessons/SkippedLessons";
import Documents from "../../pages/diary/documents/Documents";
import About from "../../pages/about/About";
import EmptyAuditories from "../../pages/emptyAuditories/EmptyAuditories";
import Settings from "../../pages/settings/Settings";
import {getInitialPage} from "./getInitialPage";
import {isPWA} from "./IsPWA";
import Installation from "../installation/Installation";

const ProjectRoutes = () => {
    return (
        <Routes>
            <Route path={Page.Timetable} element={<Timetable/>}/>
            <Route path={Page.Diary} element={isPWA() ? <Diary /> : <Installation />}/>
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