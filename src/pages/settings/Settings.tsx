import React, {useState} from 'react';
import Icon from "../../components/icon/Icon"
import {appSettingsStore, setNavbarItems} from "../../modules/effector/AppSettingsSrore"
import {useStore} from "effector-react";
import {NavbarItem, defaultItems} from '../../components/navbar/NavbarItems'
import {StorageKey} from "../../modules/StorageKey";
import {getInitialPage} from "../../components/projectRoot/getInitialPage";
import {List, ListSubheader, ListItemButton, ListItemText, ListItemIcon, Checkbox} from "@mui/material";

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
            <List
                sx={{ width: '100%' }}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Навигационная паенль
                    </ListSubheader>
                }
            >
                {navbarItems.map((navbarItem) => {
                    return (
                    <ListItemButton
                            onClick={() => setItems(navbarItems.map((item) => {
                                if (item.value === navbarItem.value) {
                                    item.isActive = !navbarItem.isActive
                                }
                                return item
                            }))} dense>
                        <ListItemIcon>
                            <Checkbox
                                edge="start"
                                checked={navbarItem.isActive}
                                disableRipple
                            />
                        </ListItemIcon>
                        <ListItemText primary={navbarItem.value} />
                        <ListItemIcon>
                            <Icon iconName={navbarItem.iconName}/>
                        </ListItemIcon>
                    </ListItemButton>
                    )
                })}
            </List>
            <List
                sx={{ width: '100%' }}
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Выбор загрузочной панели
                    </ListSubheader>
                }
            >
                {defaultItems.map((navbarItem) => {
                    return (
                        <ListItemButton onClick={() => {
                            setInitialPage(navbarItem.link)
                            localStorage.setItem(StorageKey.InitialPage, navbarItem.link)
                        }} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={navbarItem.link === initialPage}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={navbarItem.value} />
                            <ListItemIcon>
                                <Icon iconName={navbarItem.iconName}/>
                            </ListItemIcon>
                        </ListItemButton>
                    )
                })}
            </List>
        </>
    );
};

export default Settings;