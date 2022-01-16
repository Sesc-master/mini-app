import React from "react";
import { Div, Button, Text, SliderSwitch } from "@vkontakte/vkui";
// import ico from "../Images/Icon.svg"
// import '../../../public/Styles/About.css'
// import '@vkontakte/vkui/dist/vkui.css';
import {useSelector, useDispatch} from "react-redux"
import { IRootState } from "../../Modules/IRootState"
import Image from "next/image"
import mountains from "../../../public/Sesc-master.svg"

type IAbout = {
    setActiveView: (view: string) => void,
}

const About = (props : IAbout) => {
    const dispatch = useDispatch();
    const scheme = useSelector((state: IRootState) => state.scheme)

    const setScheme = (scheme: "client_dark" | "client_light") => {
        dispatch({type: "SET_SCHEME", payload: scheme})
        localStorage.setItem("scheme", scheme)
    }  

    return (
        <>
            <Div className="about-content">
                <Div>
                    <Image
                        alt="Mountains"
                        src={mountains}
                        width={200}
                        height={200}
                    />
                </Div>
                <Text weight='medium' style={{fontSize: "25px", marginBottom: "1.5em"}}>SESC Master</Text>
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
                    <Button size="l" stretched mode="outline" onClick={() => props.setActiveView("empty-cabinet")}>
						Найти свободный кабинет
                    </Button>
                </Div>
                <Div className='end'></Div>
            </Div>
        </>
    );
}

export default About;