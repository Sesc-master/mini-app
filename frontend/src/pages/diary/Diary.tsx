import React, {useEffect, useState, useRef} from "react";
import {Div, HorizontalScroll, Spinner, Tabs, TabsItem} from "@vkontakte/vkui"
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
import Absences from "./absences/Absences";

const DiaryPanel = {
    Journal: {
        name: "Дневник",
        element: <Journal/>
    },
    Marks: {
        name: "Табель",
        element: <Marks/>
    },
    Documents: {
        name: "Документы",
        element: <Documents/>
    },
    Notes: {
        name: "Заметки",
        element: <Notes/>
    },
    Skips: {
        name: "Пропуски",
        element: <Absences/>
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
                <Tabs>
                    <HorizontalScroll
                        getScrollToLeft={(i) => i - 120}
                        getScrollToRight={(i) => i + 120}
                    >
                        {
                            Object.values(DiaryPanel).map((panel, id) =>
                                <TabsItem onClick={() => setActivePage(panel)}
                                          selected={activePage.name === panel.name}
                                          key={id}>
                                    {panel.name}
                                </TabsItem>
                            )
                        }
                    </HorizontalScroll>
                </Tabs>
            )}
            {isLogin && !isDiaryLoading && activePage?.element}
            {isError && <Div className="diary-error">Убедитесь, что корректно указали данные</Div>}
        </>
    );
}

export default Diary;