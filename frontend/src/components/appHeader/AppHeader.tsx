import React from "react";
import {PanelHeader} from "@vkontakte/vkui";
import styles from "./AppHeader.module.scss";
  

// import '@vkontakte/vkui/dist/vkui.css';

const AppHeader = () : JSX.Element => {
    return(
        <PanelHeader className={styles.appHeader} fixed={false} separator={false}>SESC Master</PanelHeader>
    )
}

export default AppHeader;