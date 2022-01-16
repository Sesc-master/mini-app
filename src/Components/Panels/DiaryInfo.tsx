import React from "react";
import { Div, Button, Text} from "@vkontakte/vkui";
import {useSelector, useDispatch} from "react-redux"
import { IRootState } from "../../Modules/IRootState"

type IAbout = {
    setActiveView: (view: string) => void,
}

const DiaryInfo = (props : IAbout) => {
    const dispatch = useDispatch();
    const localStorageLogin = useSelector((state : IRootState) => state.localStorageLogin)
    const isLoaded = useSelector((state : IRootState) => state.isJournalLoaded)

    const exitJournal = () => {
        setSubjects([])
        setJournal({})
        setIsJournalLoaded(false)
        localStorage.removeItem(localStorageLogin)
    }

    const setSubjects = (subjects : string[]) => {
        dispatch({type: "SET_SUBJECTS", payload: subjects})
    }

    const setJournal = (journal : {}) => {
        dispatch({type: "SET_JOURNAL", payload: journal})
    }

    const setIsJournalLoaded = (isLoaded : boolean) => {
        dispatch({type: "SET_IS_JOURNAL_LOADED", payload: isLoaded})
    }

    return (
        <>  
            <Div style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
                {!isLoaded && <Text style={{textAlign: 'center'}} weight="semibold">Авторизуйтесь, чтобы видеть ваши данные</Text>}
                {isLoaded && 
                <>
                    <Div className='link'>
                        <Button size="l" stretched mode="outline" onClick={() => props.setActiveView("marks")}>Табель</Button>
                    </Div>
                    <Div className='link'>
                        <Button size="l" stretched mode="outline" onClick={() => props.setActiveView("notes")}>Заметки</Button>
                    </Div>
                    <Div className='link'>
                        <Button size="l" stretched mode="outline" onClick={() => props.setActiveView("absences")}>Пропуски</Button>
                    </Div>
                    <Div className='link'>
                        <Button size="l" stretched mode="outline" onClick={() => props.setActiveView("documents")}>Справки</Button>
                    </Div>
                    <Div className='link'>
                        <Button size="l" stretched mode="outline" onClick={exitJournal}>Выйти из Дневника</Button>
                    </Div>
                </>
                }
                <Div className='end'></Div>
            </Div>
        </>
    );
}

export default DiaryInfo;