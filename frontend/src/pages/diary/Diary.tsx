import React, {useEffect, useState, useRef} from "react";
import "./Diary.css"
import Login from "./login/Login";
import Journal from "./journal/Journal"
import {
    setIsDiaryLoading,
    diaryStore,
    setIsError
} from "../../modules/effector/DiaryStore";
import {useStore} from "effector-react";
import {useLoadDiary} from "../../hooks/useLoadDiary";
import Loading from "../../components/loading/Loading";
import Marks from "./marks/Marks";
import Documents from "./documents/Documents";
import Notes from "./notes/Notes";
import SkippedLessons from "./skipedLessons/SkippedLessons";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const DiaryPanel = {
    Journal: {
        name: "Дневник",
        element: <Journal/>
    },
    SkippedLessons: {
        name: "Пропуски",
        element: <SkippedLessons/>
    },
    Marks: {
        name: "Табель",
        element: <Marks/>
    },
    Notes: {
        name: "Заметки",
        element: <Notes/>
    },
    Documents: {
        name: "Документы",
        element: <Documents/>
    },
}

const Diary = () : JSX.Element => {
    const [loginRequest, setLoginRequest] = useState<any>({})
    const {isLogin, isDiaryLoading, isError} = useStore(diaryStore)
    const [activePage, setActivePage] = useState<any>(DiaryPanel.Journal);
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current === true){
            firstUpdate.current = false
            return;
        }

        setIsDiaryLoading(true);
        setIsError(false);

        const {login, password, type} = loginRequest;
        useLoadDiary(login, password, type);
    }, [loginRequest])

    return (
        <>	
            {isDiaryLoading && <Loading />}
            {!isLogin && !isDiaryLoading && <Login setLoginRequest={setLoginRequest}/>}
            {isLogin && (
                <Tabs
                    value={activePage.name}
                    variant="fullWidth"
                    allowScrollButtonsMobile
                    scrollButtons
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 },
                        },
                    }}
                >
                    {Object.values(DiaryPanel).map((panel, id) =>
                        <Tab
                            onClick={() => setActivePage(panel)}
                            value={panel.name}
                            key={id}
                            label={panel.name}
                        />
                    )}
                </Tabs>
            )}
            {isLogin && !isDiaryLoading && activePage?.element}
            {isError && <section className="diary-error">
                Убедитесь, что корректно указали данные
            </section>}
        </>
    );
}

export default Diary;