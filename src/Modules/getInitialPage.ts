import {StorageKey} from "./StorageKey";
import {Page} from "./Routes";

export const getInitialPage = () => {
    if (localStorage.getItem(StorageKey.InitialPage) !== null){
        return  localStorage.getItem(StorageKey.InitialPage) || "{}"
    }else {
        return Page.About
    }
}