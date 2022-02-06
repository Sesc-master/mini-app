import React from "react";
import { Div, Button, Text, SliderSwitch } from "@vkontakte/vkui";
import Image from "next/image"
// @ts-ignore
import sescMaster from "../../../public/sesc-master.svg"
import {useNavigate} from "react-router-dom";
import {Page} from "../../Modules/Routes";
import {appSettingsStore, setScheme as changeScheme} from "../../Modules/Effector/AppSettingsSrore";
import {useStore} from "effector-react";

const About = () : JSX.Element => {
    const store = useStore(appSettingsStore)
    const navigator = useNavigate()

    const setScheme = (scheme: "space_gray" | "client_light") => {
        changeScheme(scheme)
        localStorage.setItem("scheme", scheme)
    }  

    return (
        <>
            <Div className="about-content">
                <Div>
                    <Image
                        alt="sesc-master"
                        src={sescMaster}
                        width={228}
                        height={228}
                    />
                </Div>
                <Text weight='medium' style={{fontSize: "25px", marginBottom: "1.5em"}}>SESC Master</Text>
                <Div className='link'>
                    <SliderSwitch 
                        options={[
                            {
                                name: "Тёмная тема",
                                value: "space_gray",
                            },
                            {
                                name: "Светлая тема",
                                value: "client_light",
                            },]}
                        onSwitch={(value : any) => {
                            setScheme(value)
                        }}
                        activeValue={store.scheme}
                    />
                </Div>
                <Div className='link' >
                    <Button size="l" stretched mode="outline" onClick={() => {
                        window.open("https://vk.com/public209502423")
                    }}>Группа ВК</Button>
                </Div>
                <Div className='link'>
                    <Button size="l" stretched mode="outline" onClick={() => navigator(Page.EmptyAuditories)}>
						Найти свободный кабинет
                    </Button>
                </Div>
                <Div className='end'></Div>
            </Div>
        </>
    );
}

export default About;