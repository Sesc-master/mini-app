import React, { useEffect, useState } from "react";
import {useNavigate, useLocation} from 'react-router-dom';
import Icon from "../icon/Icon";
import {appSettingsStore} from "../../modules/effector/AppSettingsSrore"
import {useStore} from "effector-react";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
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
        <Paper
            className={styles.navbar}
            elevation={10}>
            <BottomNavigation
                value={page}
            >
                {navbarItems.map((navbarItem) => {
                    if (navbarItem.isActive) {
                        return (
                            <BottomNavigationAction
                                value={navbarItem?.link}
                                icon={<Icon iconName={navbarItem.iconName}/>}
                                onClick={() => {
                                    openPage(navbarItem.link)
                                    setPage(navbarItem.link)
                                }}>
                            </BottomNavigationAction>
                        )
                    }
                })}
            </BottomNavigation>
        </Paper>
    );
}

export default Navbar;