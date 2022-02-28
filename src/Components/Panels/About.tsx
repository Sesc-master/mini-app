import React from "react";
import {Cell, Div, Group, Header, Text} from "@vkontakte/vkui";
import Image from "next/image"
// @ts-ignore
import sescMaster from "../../../public/sesc-master.svg"
import {useNavigate} from "react-router-dom";
import {appSettingsStore} from "../../Modules/Effector/AppSettingsSrore";
import {useStore} from "effector-react";
import Icon from "../Icon";
import {IconName} from "../../Modules/IconName";
import {Page} from "../../Modules/Routes";

const About = () : JSX.Element => {
    const store = useStore(appSettingsStore)
    const navigate = useNavigate()

    return (
        <>
            <Div className='about-content'>
                <Image
                    alt="sesc-master"
                    src={sescMaster}
                    width={200}
                    height={200}
                />
                <Header mode={'primary'}>SESC Master</Header>
            </Div>
            <Group>
                <Cell before={<Icon iconName={IconName.Settings}/>} onClick={() => {
                    navigate(Page.Settings)
                }}>
                    Настройки
                </Cell>
                <Cell before={<Icon iconName={IconName.EmptyRoom}/>} onClick={() => navigate(Page.EmptyAuditories)}>
                    Найти свободный кабинет
                </Cell>
            </Group>
            <Group >
                <Cell before={<Icon iconName={IconName.Link}/>} onClick={() => window.open('https://youtu.be/dQw4w9WgXcQ')}>
                    Оперативная информация
                </Cell>
            </Group>
            <Div className='end'></Div>
        </>
    );
}

export default About;