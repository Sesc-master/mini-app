import React from "react";
import {Cell, Div, Group, Header, Text} from "@vkontakte/vkui";

import sescMaster from "../assets/sesc-master.svg"
import {useNavigate} from "react-router-dom";
import {appSettingsStore} from "../modules/effector/AppSettingsSrore";
import {useStore} from "effector-react";
import Icon from "../components/icon/Icon";
import {IconName} from "../modules/IconName";
import {Page} from "../modules/Routes";

const About = () : JSX.Element => {
    const store = useStore(appSettingsStore)
    const navigate = useNavigate()

    return (
        <>
            <Div className='about-content'>
                <img
                    alt="sesc-master"
                    src={sescMaster}
                    width={200}
                    height={200}
                />
                <Header mode={"primary"}>SESC Master</Header>
            </Div>
            <Group>
                <Cell before={<Icon iconName={IconName.Settings}/>} onClick={() : void => {
                    navigate(Page.Settings)
                }}>
                    Настройки
                </Cell>
                <Cell before={<Icon iconName={IconName.EmptyRoom}/>} onClick={() : void => {navigate(Page.EmptyAuditories)}}>
                    Найти свободный кабинет
                </Cell>
            </Group>
            <Group >
                <Cell before={<Icon iconName={IconName.Link}/>} onClick={() : void => {window.open("https://youtu.be/dQw4w9WgXcQ")}}>
                    Оперативная информация
                </Cell>
            </Group>
        </>
    );
}

export default About;