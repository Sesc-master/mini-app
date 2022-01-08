import React, {useEffect, useState, useRef} from 'react';
import {Div, Spinner} from "@vkontakte/vkui"
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
	const localStorageLogin = useSelector((state : IRootState) => state.localStorageLogin)
	const firstUpdate = useRef(true);

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
	const getJournal = (login : string, password : string, type : string) => {
		return fetch('/api/journal', {
			method: 'POST',
			body: JSON.stringify({login, password, type})
		})
		.then((response) => response.json())
		.then((response) => {
			return response;
		})
	}


	useEffect(() => {
		if (localStorage.getItem(localStorageLogin) !== null){
			const loginData : {login: string, password: string, type: string} = 
			JSON.parse(localStorage.getItem(localStorageLogin) || '{}')

			getJournal(loginData.login, loginData.password, loginData.type)
			.then((response) => {
				setLoginResponse(response)
				if (response.journal){
					setSubjects(Object.keys(response.journal))
					setJournal(response.journal)
					setIsJournalLoaded(true)
				}
			})
		}

		if (firstUpdate.current === true){
			firstUpdate.current = false
			return;
		}

		getJournal(loginRequest.login, loginRequest.password, loginRequest.type)
		.then((response) => {
			setLoginResponse(response)
			if (response.journal){
				setSubjects(Object.keys(response.journal))
				setJournal(response.journal)
				setIsJournalLoaded(true)
				localStorage.setItem('loginData', JSON.stringify({
						login: loginRequest.login,
						password: loginRequest.password, 
						type: loginRequest.type
				}))
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