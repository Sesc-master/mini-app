import React, {useEffect, useState, useRef} from "react";
import {Div, Spinner} from "@vkontakte/vkui"
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

const Diary = () : JSX.Element => {
    const [loginRequest, setLoginRequest] = useState<any>({})
    const {isLogin, isDiaryLoading, isError} = useStore(diaryStore)
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