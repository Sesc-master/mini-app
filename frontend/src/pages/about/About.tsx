import React from "react";
import {Cell, Div, Group, Header, Text} from "@vkontakte/vkui";
import styles from "./About.module.scss"
import sescMaster from "../../assets/sesc-master.svg"
import {useNavigate} from "react-router-dom";
import Icon from "../../components/icon/Icon";
import {IconName} from "../../components/icon/IconName";
import {Page} from "../../components/projectRoot/Page";

const About = () : JSX.Element => {
    const navigate = useNavigate()

    return (
        <>
            <Div className={styles.content}>
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
        </>
    );
}

export default About;