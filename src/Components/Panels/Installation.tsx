import React, {useEffect, useState} from "react";
import Image from "next/image"
import {isIOS, isDesktop, isAndroid} from 'react-device-detect';
import {Div, Text} from '@vkontakte/vkui'

import ios1 from '../../../public/iosInstallation/ios1.png'
import ios2 from '../../../public/iosInstallation/ios2.png'
import ios3 from '../../../public/iosInstallation/ios3.png'

import desktop from '../../../public/desktopInstallation/desktop.png'

import android1 from '../../../public/androidInstallation/android1.jpg'
import android2 from '../../../public/androidInstallation/android2.jpg'
import android3 from '../../../public/androidInstallation/android3.jpg'

const Installation = () => {

    const iosInstallation = (
        <>
            <div className={'step'}>
                <div className='step'>
                    1. Нажмите на 
                </div>
                <Image src={ios1}/>
            </div>
            <div className={'step'}>
                <div>
                    2. Пролистайте вниз и нажмите на 
                </div>
                <Image src={ios2}/>
            </div>
            <div className={'step'}>
                <div>
                    3. Скачайте приложение
                </div>
                <Image src={ios3}/>
            </div>
        </>
    )

    const androidInstallation = (
        <>
            <div className={'step'}>
                <div>
                    1. Нажмите на 
                </div>
                <Image height={'43px'} width={'43px'} src={android1}/>
            </div>
            <div className={'step'}>
                <div>
                    2. Пролистайте вниз и нажмите на 
                </div>
                <Image src={android2}/>
            </div>
            <div className={'step'}>
                <div >
                    3. Скачайте приложение на android
                </div>
                <Image src={android3}/>
            </div>
        </>
    )


    const desktopInstallation = (
        <>
            <div className={'step'}>
                <div>
                    В верхнем правом углу нажмите на кнопку установить
                </div>
                <Image src={desktop}/>
            </div>
        </>
    )

    return(
        <Div>
            <Text weight="semibold">
                К сожалению, вы не можете пользоваться дневником напрямую из браузера,
                но он станет доступным, если вы установите наше приложение. Это сделано
                по требованию отедла компьютеризации СУНЦ УрФУ.
            </Text>
            <h3>Установка</h3>
            {isIOS && iosInstallation}
            {isAndroid && androidInstallation}
            {isDesktop && !isIOS && desktopInstallation}
            <h4>
                Для ios используйте safari, для всего отсального - chrome
            </h4>
            <div className='end'></div>
        </Div>
    )
}

export default Installation;