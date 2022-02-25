import {createEvent, createStore} from "effector";
import {IModal} from "../Modal";
import {NavbarItem, defaultItems} from "../NavbarItems";
import {Appearance} from "../Appearance";
import {Page} from "../Routes";

export const setModalView = createEvent<IModal>()
export const setScheme = createEvent<string>()
export const setNavbarItems = createEvent<NavbarItem[]>()
export const setInitialPage = createEvent<Page>()


export type IAppSettingsStore = {
    scheme: string,
    modalView: IModal,
    navbarItems: NavbarItem[],
    initialPage: Page
}

export const appSettingsStore = createStore<IAppSettingsStore>({
    modalView: '',
    scheme: Appearance.Dark,
    navbarItems: defaultItems,
    initialPage: Page.About
})
    .on(setModalView, (state, modalView) => (
        {...state, modalView}
    ))
    .on(setScheme, (state, scheme) => (
        {...state, scheme}
    ))
    .on(setNavbarItems, (state,navbarItems) => (
        {...state, navbarItems}
    ))
    .on(setInitialPage, (state, initialPage) => (
        {...state, initialPage}
    ))
