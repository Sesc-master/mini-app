import React, {useEffect, useState} from 'react';
import {Div} from "@vkontakte/vkui"
import { IRootState } from '../../Modules/IRootState'

// import '@vkontakte/vkui/dist/vkui.css';
import Login from '../Login';
import Task from '../Task';
import Journal from '../Journal'
import {useDispatch, useSelector} from 'react-redux'

type IDiaryProps = { 
	setActiveViewSubjects: () => void
}

const Diary = ({setActiveViewSubjects}: IDiaryProps) => {
	const [loginRequest, setLoginRequest] = useState<any>({})
	const [loginResponse, setLoginResponse] = useState<any>({})
	const dispatch = useDispatch()
	let isLoaded = useSelector((state : IRootState) => state.isJournalLoaded)

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
		fetch('/api/journal', {
			method: 'POST',
			body: JSON.stringify({login: loginRequest.login, password: loginRequest.password, type: loginRequest.type})
		})
		.then((response) => response.json())
		.then((response) => {
			setLoginResponse(response)
			if (response.journal){
				setSubjects(Object.keys(response.journal))
				setJournal(response.journal)
				setIsJournalLoaded(true)
			}
		})
	}, [loginRequest])

	return (
		<>	
			{!isLoaded && <Login setLoginRequest={setLoginRequest}/>}
			{isLoaded && <Journal setActiveViewSubjects={setActiveViewSubjects}/>}
		</>

	);
}

export default Diary;