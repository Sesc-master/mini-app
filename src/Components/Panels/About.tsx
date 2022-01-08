import React from 'react';
import { Div, Button} from "@vkontakte/vkui";
// import ico from "../Images/Icon.svg"
// import '../../../public/Styles/About.css'

// import '@vkontakte/vkui/dist/vkui.css';
import {useSelector, useDispatch} from 'react-redux'
import { IRootState } from '../../Modules/IRootState'

type IAbout = {
	setActiveView: () => void
}

const About = (props : IAbout) => {
	const dispatch = useDispatch();
	const localStorageLogin = useSelector((state : IRootState) => state.localStorageLogin)
	let isLoaded = useSelector((state : IRootState) => state.isJournalLoaded)

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
		<Div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
			{/* <Div>
				<img alt='master' src={ico} className='icon'/>
			</Div>
			<Div>
				<h1 className='app-name'>SESC Master</h1>
			</Div> */}
			<Div className='link'>
				<Button size="l" stretched mode="outline" >Группа ВК</Button>
     		</Div>
			 <Div className='link'>
				<Button size="l" stretched mode="outline" onClick={props.setActiveView}>Найти свободный кабинет</Button>
			</Div>
			{isLoaded && <Div className='link'>
					<Button size="l" stretched mode="destructive" onClick={exitJournal}>Выйти из Дневника</Button>
			</Div>}
		</Div>
	);
}

export default About;