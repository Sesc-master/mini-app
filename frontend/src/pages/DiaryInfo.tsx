import React from "react";
import { Div, Button, Text} from "@vkontakte/vkui";
import {useNavigate} from "react-router-dom";
import {Page } from '../modules/Routes'
import {setIsLogin, setDiary, setSubjects, diaryStore} from "../modules/effector/DiaryStore";
import {useStore} from 'effector-react'
import {StorageKey} from "../modules/StorageKey";


const DiaryInfo = () : JSX.Element => {
    const navigate = useNavigate()
    const {isLogin} = useStore(diaryStore)

    const exitJournal = () => {
        setSubjects([])
        setDiary({})
        setIsLogin(false)
        localStorage.removeItem(StorageKey.Login)
    }

    return (
        <>
            <Div style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
                {!isLogin && <Text style={{textAlign: 'center'}} weight="semibold">Авторизуйтесь, чтобы видеть ваши данные</Text>}
                {isLogin &&
                <>
                    <Div className='link'>
                        <Button size="l" stretched mode="outline" onClick={() => navigate(Page.Marks)}>Табель</Button>
                    </Div>
                    <Div className='link'>
                        <Button size="l" stretched mode="outline" onClick={() => navigate(Page.Notes)}>Заметки</Button>
                    </Div>
                    <Div className='link'>
                        <Button size="l" stretched mode="outline" onClick={() => navigate(Page.Absences)}>Пропуски</Button>
                    </Div>
                    <Div className='link'>
                        <Button size="l" stretched mode="outline" onClick={() => navigate(Page.Documents)}>Справки</Button>
                    </Div>
                    <Div className='link'>
                        <Button size="l" stretched mode="outline" onClick={exitJournal}>Выйти из Дневника</Button>
                    </Div>
                </>
                }
            </Div>
        </>
    );
}

export default DiaryInfo;