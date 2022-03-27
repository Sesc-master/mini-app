import React, { useEffect, useState } from "react";
import {Tabbar, TabbarItem} from "@vkontakte/vkui";
import {useNavigate, useLocation} from 'react-router-dom';
import Icon from "../Icon"
import {appSettingsStore} from "../../modules/effector/AppSettingsSrore"
import {useStore} from "effector-react";
import styles from "./Navbar.module.scss"


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
        <Tabbar className={styles.navbar}>
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