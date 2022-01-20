import React, {useEffect, useState, useRef} from "react";
import {Div, Spinner} from "@vkontakte/vkui"
import { IRootState } from "../../Modules/IRootState"
import { getDiary } from "../../Modules/GetDiary";

// import '@vkontakte/vkui/dist/vkui.css';
import Login from "../Login";
import Journal from "../Journal"
import {useDispatch, useSelector} from "react-redux"


type IDiaryProps = { 
    setActiveViewSubjects: () => void
}

const Diary = ({setActiveViewSubjects}: IDiaryProps) => {
    const [loginRequest, setLoginRequest] = useState<any>({})
    const isLoading = useSelector((state: IRootState) : boolean => state.isJournalLoading)
    const [isError, setIsError] = useState<boolean>(false)
    const dispatch = useDispatch() 
    let isLogin = useSelector((state : IRootState) => state.isLogin)
    const firstUpdate = useRef(true);

    const setToken = (token: string) => {
        dispatch({type: "SET_TOKEN", payload: token})
    }

    const setSubjects = (subjects : string[]) => {
        dispatch({type: "SET_SUBJECTS", payload: subjects})
    }

    const setJournal = (journal : {}) => {
        dispatch({type: "SET_JOURNAL", payload: journal})
    }

    const setIsLogin = (isLogin : boolean) => {
        dispatch({type: "SET_IS_LOGIN", payload: isLogin})
    }

    const setIsJournalLoading = (isLoading: boolean) : void => {
        dispatch({type: "SET_IS_JOURNAL_LOADING", payload: isLoading})
    }
    // const subjects = isJournalLoaded ? Object.keys(loginResponse.journal) : []

    useEffect(() => {
        if (firstUpdate.current === true){
            firstUpdate.current = false
            return;
        }

        setIsJournalLoading(true)
        setIsError(false)

        getDiary(loginRequest.login, loginRequest.password, loginRequest.type)
            .then((response) => {
                if (response.journal){
                    setSubjects([...response.journal.keys()])
                    setJournal(response.journal)
                    setIsLogin(true)
                    localStorage.setItem("loginData", JSON.stringify({
                        login: loginRequest.login,
                        password: loginRequest.password, 
                        type: loginRequest.type
                    }))
                    setToken(response.token)
                }
                setIsJournalLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsError(true)
                setIsJournalLoading(false)
            })
        
    }, [loginRequest])

    return (
        <>	
            {isLoading && 
			<div className='loader'>
			    <Spinner size='medium'/>
			</div>}
            {!isLogin && !isLoading && <Login setLoginRequest={setLoginRequest}/>}
            {isLogin && !isLoading && <Journal setActiveViewSubjects={setActiveViewSubjects}/>}
            {isError && <Div className="diary-error">Убедитесь, что корректно указали данные</Div>}
        </>

    );
}

export default Diary;