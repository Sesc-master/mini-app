import React, {useEffect, useState} from 'react';
import {Cell, Div, Group, Header} from '@vkontakte/vkui'
import Icon from "../components/Icon"
import {appSettingsStore, setNavbarItems, setInitialPage} from "../modules/effector/AppSettingsSrore"
import {useStore} from "effector-react";
import {Page} from "../modules/Routes";
import {Appearance} from "../modules/Appearance";
import {NavbarItem, defaultItems} from '../modules/NavbarItems'
import {useSetScheme} from "../hooks/useSetScheme";
import {StorageKey} from "../modules/StorageKey";
import {getInitialPage} from "../modules/getInitialPage";


const Settings = () => {
    const {navbarItems, scheme} = useStore(appSettingsStore)
    const [initialPage, setInitialPage] = useState(getInitialPage());

    const changeAppearance = () => {
        if (scheme === Appearance.Light){
            useSetScheme(Appearance.Dark)
        } else {
            useSetScheme(Appearance.Light)
        }
    }

    const setItems = (list: NavbarItem[]) => {
        setNavbarItems(list);
        localStorage.setItem(StorageKey.NavbarItems, JSON.stringify(list))
    }

    const reorderItems = (from : number, to : number, items: NavbarItem[])  => {
        const list = [...items];
        list.splice(from, 1);
        list.splice(to, 0, items[from]);
        setItems(list);
    };

    return (
        <>
            <Group
                header={
                    <Header>Тема</Header>
                }
            >
                <Cell checked={scheme === Appearance.Dark} onChange={() => changeAppearance()} mode='selectable'>
                    Тёмная тема
                </Cell>
            </Group>
            <Group
                header={
                    <Header>Выбор панелей на навбаре </Header>
                }
            >
                {navbarItems.map((navbarItem) => {
                    return (
                        <Cell checked={navbarItem.isActive}
                              disabled={navbarItem.link === Page.About}
                              mode='selectable' draggable
                              onChange={() => setItems(navbarItems.map((item) => {
                                  if (item.value === navbarItem.value) {
                                      item.isActive = !navbarItem.isActive
                                  }
                                  return item
                              }))}
                              onDragFinish={({ from, to }) => {
                                  reorderItems(from - 1, to - 1, navbarItems)
                              }}
                              before={<Icon iconName={navbarItem.iconName}/>}>
                            {navbarItem.value}
                        </Cell>
                    )
                })}
            </Group>
            <Group
                header={
                    <Header>Выбор загрузочной панели</Header>
                }
            >
                {defaultItems.map((navbarItem) => {
                    return (
                        <Cell checked={navbarItem.link === initialPage}
                              mode='selectable'
                              onChange={() => {
                                  setInitialPage(navbarItem.link)
                                  localStorage.setItem(StorageKey.InitialPage, navbarItem.link)
                              }}
                              before={<Icon iconName={navbarItem.iconName}/>}>
                              {navbarItem.value}
                        </Cell>
                    )
                })}
            </Group>
        </>
    );
};

export default Settings;