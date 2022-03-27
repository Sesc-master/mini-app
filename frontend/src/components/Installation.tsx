import React, {useEffect, useState} from "react";
import {isIOS, isDesktop, isAndroid} from "react-device-detect";
import {Div, Text, Group, Header} from "@vkontakte/vkui"
import {setIsPWA} from "../modules/effector/AppSettingsSrore";

import ios1 from "../assets/iosInstallation/ios1.png"
import ios2 from "../assets/iosInstallation/ios2.png"
import ios3 from "../assets/iosInstallation/ios3.png"

import desktop from "../assets/desktopInstallation/desktop.png"

import android1 from "../assets/androidInstallation/android1.jpg"
import android2 from "../assets/androidInstallation/android2.jpg"
import android3 from "../assets/androidInstallation/android3.jpg"

const Installation = () : JSX.Element => {
    useEffect(() => {
        setIsPWA(window.matchMedia("(display-mode: standalone)").matches)
    })

    const iosInstallation = (
        <>
            <div className={"step"}>
                <div className='step'>
                    1. Нажмите на 
                </div>
                <img src={ios1}/>
            </div>
            <div className={"step"}>
                <div>
                    2. Пролистайте вниз и нажмите на 
                </div>
                <img src={ios2}/>
            </div>
            <div className={"step"}>
                <div>
                    3. Скачайте приложение
                </div>
                <img src={ios3}/>
            </div>
        </>
    )

    const androidInstallation = (
        <>
            <div className={"step"}>
                <div>
                    1. Нажмите на 
                </div>
                <img height={"43px"} width={"43px"} src={android1}/>
            </div>
            <div className={"step"}>
                <div>
                    2. Пролистайте вниз и нажмите на 
                </div>
                <img src={android2}/>
            </div>
            <div className={"step"}>
                <div >
                    3. Скачайте приложение на android
                </div>
                <img src={android3}/>
            </div>
        </>
    )


    const desktopInstallation = (
        <>
            <div className={"step"}>
                <div>
                    1. В верхнем правом углу нажмите на кнопку установить
                </div>
                <img src={desktop}/>
            </div>
        </>
    )

    return(
        <Div>
            <Group header={<Header>Дневник доступен только в приложении</Header>}>
                <Text weight="semibold">
                    К сожалению, вы не можете пользоваться дневником напрямую из браузера,
                    но он станет доступным, если вы установите наше приложение. Это сделано
                    по требованию отдела компьютеризации СУНЦ УрФУ.
                </Text>
            </Group>
            <Group header={<Header>Установка</Header>}>
                {isIOS && iosInstallation}
                {isAndroid && androidInstallation}
                {isDesktop && !isIOS && desktopInstallation}
            </Group>
            <h4>
                Рекомендуем для ios использовать safari, для всего остального - chrome
            </h4>
            <div className='end'></div>
        </Div>
    )
}

export default Installation;