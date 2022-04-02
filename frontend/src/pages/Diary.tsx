import React, {useEffect, useState, useRef} from "react";
import {Div, Spinner} from "@vkontakte/vkui"
import { getDiary } from "../modules/GetDiary";
import Login from "../components/login/Login";
import Journal from "../components/journal/Journal"
import {
    setToken,
    setSubjects,
    setDiary,
    setIsLogin,
    setIsDiaryLoading,
    diaryStore
} from "../modules/effector/DiaryStore";
import {useStore} from "effector-react";
import {StorageKey} from "../modules/StorageKey"

const Diary = () : JSX.Element => {
    const [loginRequest, setLoginRequest] = useState<any>({})
    const [isError, setIsError] = useState<boolean>(false)
    const {isLogin, isDiaryLoading} = useStore(diaryStore)
    const firstUpdate = useRef(true);

    useEffect(() => {
        if (firstUpdate.current === true){
            firstUpdate.current = false
            return;
        }

        setIsDiaryLoading(true)
        setIsError(false)

        getDiary(loginRequest.login, loginRequest.password, loginRequest.type)
            .then((response : any) => {
                if (response.journal){
                    setSubjects([...response.journal.keys()])
                    setDiary(response.journal)
                    setIsLogin(true)
                    localStorage.setItem(StorageKey.Login, JSON.stringify({
                        login: loginRequest.login,
                        password: loginRequest.password, 
                        type: loginRequest.type
                    }))
                    setToken(response.token)
                }
                setIsDiaryLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsError(true)
                setIsDiaryLoading(false)
            })
    }, [loginRequest])

    return (
        <>	
            {isDiaryLoading &&
			<div className='loader'>
			    <Spinner size='medium'/>
			</div>}
            {!isLogin && !isDiaryLoading && <Login setLoginRequest={setLoginRequest}/>}
            {isLogin && !isDiaryLoading && <Journal />}
            {isError && <Div className="diary-error">Убедитесь, что корректно указали данные</Div>}
        </>
    );
}

export default Diary;