import React, {useState} from 'react';
import {Cell, Group, Header} from '@vkontakte/vkui'
import Icon from "../../components/icon/Icon"
import {appSettingsStore, setNavbarItems} from "../../modules/effector/AppSettingsSrore"
import {useStore} from "effector-react";
import {Page} from "../../components/projectRoot/Page";
import {NavbarItem, defaultItems} from '../../components/navbar/NavbarItems'
import {StorageKey} from "../../modules/StorageKey";
import {getInitialPage} from "../../components/projectRoot/getInitialPage";


const Settings = () => {
    const {navbarItems} = useStore(appSettingsStore)
    const [initialPage, setInitialPage] = useState(getInitialPage());

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