import React, { useEffect, useState } from "react";
import {Tabbar, TabbarItem, FixedLayout} from "@vkontakte/vkui";
import { Icon28NewsfeedOutline, Icon28MenuOutline,} from "@vkontakte/icons";
import { Icon28BillheadOutline } from '@vkontakte/icons';
import { Icon28ServicesOutline } from '@vkontakte/icons';
import "@vkontakte/vkui/dist/vkui.css";
import {Page} from "../Modules/Routes";
import {useNavigate, useLocation} from 'react-router-dom';

type IPage = Page.About | Page.Timetable | Page.DiaryInfo | Page.Diary | ''

const Navbar = () => {
    const [page, setPage] = useState<IPage>()
    const navigate = useNavigate();
    const openPage = (page: IPage) : void => {
        navigate(page)
    }
    const location = useLocation();

    const setCurrentLocation = () => {
        let path : IPage = '';
        
        switch (location.pathname){
            case Page.About:
                path = Page.About
                break
            case Page.Timetable:
                path = Page.Timetable
                break
        }

        setPage(path)
    }

    useEffect(() => {
        setCurrentLocation()
    })

    return (    
            <Tabbar className="navbar">
                <TabbarItem selected={page === Page.Timetable} onClick={() => {
                    openPage(Page.Timetable)
                }}>
                    < Icon28BillheadOutline/>
                </TabbarItem>
                {/* <TabbarItem selected={page === Page.Diary} onClick={() => {
                    setPage(Page.Diary)
                    openPage(Page.Diary)
                }}>
                    <Icon28NewsfeedOutline/>
                </TabbarItem>
                <TabbarItem selected={page === Page.DiaryInfo} onClick={() => {
                    setPage(Page.DiaryInfo)
                    openPage(Page.DiaryInfo)
                }}>
                    < Icon28ServicesOutline/>
                </TabbarItem> */}
                <TabbarItem selected={page === Page.About} onClick={() => {
                    openPage(Page.About)
                }}>
                    <Icon28MenuOutline/>
                </TabbarItem>
            </Tabbar>
    );
}

export default Navbar;