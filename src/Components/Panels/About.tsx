import React from "react";
import { Div, Button, Switch, Group, Cell, Text, SliderSwitch } from "@vkontakte/vkui";
// import ico from "../Images/Icon.svg"
// import '../../../public/Styles/About.css'

// import '@vkontakte/vkui/dist/vkui.css';
import {useSelector, useDispatch} from "react-redux"
import { IRootState } from "../../Modules/IRootState"

import Image from "next/image"
import mountains from "../../../public/Sesc-master.svg"

type IAbout = {
    setActiveView: () => void,
}

const About = (props : IAbout) => {
    const dispatch = useDispatch();
    const localStorageLogin = useSelector((state : IRootState) => state.localStorageLogin)
    const isLoaded = useSelector((state : IRootState) => state.isJournalLoaded)
    const scheme = useSelector((state: IRootState) => state.scheme)

    const setScheme = (scheme: "client_dark" | "client_light") => {
        dispatch({type: "SET_SCHEME", payload: scheme})
        localStorage.setItem("scheme", scheme)
    }  

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
                <Div>
                    <Image
                        alt="Mountains"
                        src={mountains}
                        width={200}
                        height={200}
                    />
                </Div>
                <Text weight='medium' style={{fontSize: "25px", marginBottom: "1.5em"}}>SESC master</Text>
                <Div className='link'>
                    <SliderSwitch 
                        options={[
                            {
                                name: "Тёмная тема",
                                value: "client_dark",
                            },
                            {
                                name: "Светлая тема",
                                value: "client_light",
                            },]}
                        onSwitch={(value : any) => {
                            console.log(value)
                            setScheme(value)
                        }}
                        activeValue={scheme}
                    />
                </Div>
                <Div className='link' >
                    <Button size="l" stretched mode="outline" onClick={() => {
                        window.open("https://vk.com/public209502423")
                    }}>Группа ВК</Button>
                </Div>
                <Div className='link'>
                    <Button size="l" stretched mode="outline" onClick={props.setActiveView}>
						Найти свободный кабинет
                    </Button>
                </Div>
                {isLoaded && <Div className='link'>
                    <Button size="l" stretched mode="outline" onClick={exitJournal}>Выйти из Дневника</Button>
                </Div>}
                <Div className='end'></Div>
            </Div>
        </>
    );
}

export default About;