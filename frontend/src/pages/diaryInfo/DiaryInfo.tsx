import React from "react";
import { Div, Button, Text} from "@vkontakte/vkui";
import {useNavigate} from "react-router-dom";
import {Page } from '../../modules/Routes'
import {setIsLogin, setDiary, setSubjects, diaryStore} from "../../modules/effector/DiaryStore";
import {useStore} from 'effector-react'
import {StorageKey} from "../../modules/StorageKey";


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
            <div className="content" style={{ display: "flex", alignItems: "center", flexDirection: "column"}}>
                {!isLogin && <Text style={{textAlign: 'center'}} weight="semibold">Авторизуйтесь, чтобы видеть ваши данные</Text>}
                {isLogin &&
                <>
                    <div className='link'>
                        <Button size="l" stretched appearance={"neutral"} onClick={() => navigate(Page.Marks)}>Табель</Button>
                    </div>
                    <div className='link'>
                        <Button size="l" stretched appearance={"neutral"} onClick={() => navigate(Page.Notes)}>Заметки</Button>
                    </div>
                    <div className='link'>
                        <Button size="l" stretched appearance={"neutral"} onClick={() => navigate(Page.Absences)}>Пропуски</Button>
                    </div>
                    <div className='link'>
                        <Button size="l" stretched appearance={"neutral"} onClick={() => navigate(Page.Documents)}>Справки</Button>
                    </div>
                    <div className='link'>
                        <Button size="l" stretched appearance={"negative"} onClick={exitJournal}>Выйти из Дневника</Button>
                    </div>
                </>
                }
            </div>
        </>
    );
}

export default DiaryInfo;