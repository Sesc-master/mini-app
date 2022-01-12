import React, { useState } from "react";
import {Tabbar, TabbarItem, FixedLayout} from "@vkontakte/vkui";
import { Icon24NewsfeedOutline, Icon24Note, Icon24MenuOutline} from "@vkontakte/icons";
import "@vkontakte/vkui/dist/vkui.css";

type ISetActiveView = (view: string) => void;

type INavbar = {
    setActiveView: ISetActiveView
}

const Navbar = ({setActiveView} : INavbar) => {
    const [simple, setSimple] = useState("one")

    return (
        <FixedLayout filled vertical="bottom" >      
            <Tabbar>
                <TabbarItem text='Расписание' selected={simple === "one"} onClick={() => {
                    setSimple("one")
                    setActiveView("time-table")
                }}>
                    <Icon24Note/>
                </TabbarItem>
                <TabbarItem text='Дневник' selected={simple === "two"} onClick={() => {
                    setSimple("two")
                    setActiveView("register")
                }}>
                    <Icon24NewsfeedOutline/>
                </TabbarItem>
                <TabbarItem selected={simple === "three"} onClick={() => {
                    setSimple("three")
                    setActiveView("settings")
                }}>
                    <Icon24MenuOutline/>
                </TabbarItem>
            </Tabbar>
        </FixedLayout>      
    );
}

export default Navbar;