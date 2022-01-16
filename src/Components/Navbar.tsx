import React, { useState } from "react";
import {Tabbar, TabbarItem, FixedLayout} from "@vkontakte/vkui";
import { Icon24NewsfeedOutline, Icon24MenuOutline,} from "@vkontakte/icons";
import { Icon24BillheadOutline } from '@vkontakte/icons';
import { Icon24ServicesOutline } from '@vkontakte/icons';
import "@vkontakte/vkui/dist/vkui.css";

type ISetActiveView = (view: string) => void;

type INavbar = {
    setActiveView: ISetActiveView
}

const Navbar = ({setActiveView} : INavbar) => {
    const [view, setView] = useState("time-table")

    return (
        <FixedLayout filled vertical="bottom" >      
            <Tabbar>
                <TabbarItem selected={view === "time-table"} onClick={() => {
                    setView("time-table")
                    setActiveView("time-table")
                }}>
                    < Icon24BillheadOutline/>
                </TabbarItem>
                <TabbarItem selected={view === "register"} onClick={() => {
                    setView("register")
                    setActiveView("register")
                }}>
                    <Icon24NewsfeedOutline/>
                </TabbarItem>
                <TabbarItem selected={view === "diary-info"} onClick={() => {
                    setView("diary-info")
                    setActiveView("diary-info")
                }}>
                    < Icon24ServicesOutline/>
                </TabbarItem>
                <TabbarItem selected={view === "settings"} onClick={() => {
                    setView("settings")
                    setActiveView("settings")
                }}>
                    <Icon24MenuOutline/>
                </TabbarItem>
            </Tabbar>
        </FixedLayout>      
    );
}

export default Navbar;