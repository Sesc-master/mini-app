import React, { useState } from "react";
import {Tabbar, TabbarItem, FixedLayout} from "@vkontakte/vkui";
import { Icon28NewsfeedOutline, Icon28MenuOutline,} from "@vkontakte/icons";
import { Icon28BillheadOutline } from '@vkontakte/icons';
import { Icon28ServicesOutline } from '@vkontakte/icons';
import "@vkontakte/vkui/dist/vkui.css";
import {Page} from "../Modules/Routes";
import {useNavigate} from 'react-router-dom';

type IPage = Page.About | Page.Timetable | Page.DiaryInfo | Page.Diary

const Navbar = () => {
    const [page, setPage] = useState<IPage>()
    const navigate = useNavigate();
    const openPage = (page: IPage) : void => {
        navigate(page)
    }

    return (    
            <Tabbar className="navbar">
                <TabbarItem selected={page === Page.Timetable} onClick={() => {
                    setPage(Page.Timetable)
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
                    setPage(Page.About)
                    openPage(Page.About)
                }}>
                    <Icon28MenuOutline/>
                </TabbarItem>
            </Tabbar>
    );
}

export default Navbar;