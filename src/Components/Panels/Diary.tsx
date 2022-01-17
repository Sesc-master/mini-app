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
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isError, setIsError] = useState<Boolean>(false)
    const dispatch = useDispatch() 
    let isLoaded = useSelector((state : IRootState) => state.isJournalLoaded)
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

    const setIsJournalLoaded = (isLoaded : boolean) => {
        dispatch({type: "SET_IS_JOURNAL_LOADED", payload: isLoaded})
    }
    // const subjects = isJournalLoaded ? Object.keys(loginResponse.journal) : []

    useEffect(() => {
        setIsLoading(true)
        setIsError(false)

        if (firstUpdate.current === true){
            firstUpdate.current = false
            setIsLoading(false)
            return;
        }


        getDiary(loginRequest.login, loginRequest.password, loginRequest.type)
            .then((response) => {
                if (response.journal){
                    setSubjects([...response.journal.keys()])
                    setJournal(response.journal)
                    setIsJournalLoaded(true)
                    localStorage.setItem("loginData", JSON.stringify({
                        login: loginRequest.login,
                        password: loginRequest.password, 
                        type: loginRequest.type
                    }))
                    setToken(response.token)
                }
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setIsError(true)
                setIsLoading(false)
            })
        
    }, [loginRequest])

    return (
        <>	
            {isLoading && 
			<div className='loader'>
			    <Spinner size='medium'/>
			</div>}
            {!isLoaded && !isLoading && <Login setLoginRequest={setLoginRequest}/>}
            {isLoaded && !isLoading && <Journal setActiveViewSubjects={setActiveViewSubjects}/>}
            {isError && <Div className="diary-error">Убедитесь, что корректно указали данные</Div>}
        </>

    );
}

export default Diary;