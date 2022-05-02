import React from "react";
import {isIOS, isDesktop, isAndroid} from "react-device-detect";

import ios1 from "../../assets/iosInstallation/ios1.png"
import ios2 from "../../assets/iosInstallation/ios2.png"
import ios3 from "../../assets/iosInstallation/ios3.png"

import desktop from "../../assets/desktopInstallation/desktop.png"

import android1 from "../../assets/androidInstallation/android1.jpg"
import android2 from "../../assets/androidInstallation/android2.jpg"
import android3 from "../../assets/androidInstallation/android3.jpg"

import styles from "./Installation.module.scss";
import Typography from "@mui/material/Typography";
import {List, ListSubheader, ListItem} from "@mui/material";

const Installation = () : JSX.Element => {

    const iosInstallation = (
        <>
            <ListItem className={styles.step}>
                <Typography className='step'>
                    1. Нажмите на 
                </Typography>
                <img src={ios1}/>
            </ListItem>
            <ListItem className={styles.step}>
                <Typography>
                    2. Пролистайте вниз и нажмите на 
                </Typography>
                <img src={ios2}/>
            </ListItem>
            <ListItem className={styles.step}>
                <Typography>
                    3. Скачайте приложение
                </Typography>
                <img src={ios3}/>
            </ListItem>
        </>
    )

    const androidInstallation = (
        <>
            <ListItem className={styles.step}>
                <Typography>
                    1. Нажмите на 
                </Typography>
                <img height={"43px"} width={"43px"} src={android1}/>
            </ListItem>
            <ListItem className={styles.step}>
                <Typography>
                    2. Пролистайте вниз и нажмите на 
                </Typography>
                <img src={android2}/>
            </ListItem>
            <ListItem className={styles.step}>
                <Typography >
                    3. Скачайте приложение на android
                </Typography>
                <img src={android3}/>
            </ListItem>
        </>
    )

    const desktopInstallation = (
        <ListItem className={styles.step}>
            <Typography>
                1. В верхнем правом углу нажмите на кнопку установить
            </Typography>
            <img src={desktop}/>
        </ListItem>
    )

    return(
        <section className="content">
            <List subheader={
                <ListSubheader>
                    Дневник доступен только в приложении
                </ListSubheader>}
            >
                <ListItem>
                    <Typography>
                        К сожалению, вы не можете пользоваться дневником напрямую из браузера,
                        но он станет доступным, если вы установите наше приложение. Это сделано
                        по требованию отдела компьютеризации СУНЦ УрФУ.
                    </Typography>
                </ListItem>
            </List>
            <List disablePadding subheader={
                <ListSubheader>
                    Установка
                </ListSubheader>}
            >
                {isIOS && iosInstallation}
                {isAndroid && androidInstallation}
                {isDesktop && !isIOS && desktopInstallation}
            </List>
            <Typography>
                Рекомендуем для ios использовать safari, для всего остального - chrome
            </Typography>
        </section>
    )
}

export default Installation;