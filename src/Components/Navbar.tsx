import React, { useEffect, useState } from "react";
import {Tabbar, TabbarItem, FixedLayout} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import {useNavigate, useLocation} from 'react-router-dom';
import {defaultItems} from "../Modules/NavbarItems";
import Icon from "./Icon"
import {appSettingsStore} from "../Modules/Effector/AppSettingsSrore"
import {useStore} from "effector-react";

const Navbar = () => {
    const [page, setPage] = useState<string>()
    const {navbarItems} = useStore(appSettingsStore)
    const navigate = useNavigate();
    const location = useLocation();

    const setCurrentLocation = () => {
        let path : string = location.pathname;
        setPage(path)
    }

    const openPage = (page: string) : void => {
        navigate(page)
    }

    useEffect(() => {
        setCurrentLocation()
    }, )

    return (    
            <Tabbar className={`navbar`}>
                {navbarItems.map((navbarItem) => {
                    if (navbarItem.isActive) {
                        return (
                            <TabbarItem selected={page === navbarItem.link} onClick={() => {
                                openPage(navbarItem.link)
                                setPage(navbarItem.link)
                            }}>
                                <Icon iconName={navbarItem.iconName}/>
                            </TabbarItem>
                        )
                    }
                })}
            </Tabbar>
    );
}

export default Navbar;