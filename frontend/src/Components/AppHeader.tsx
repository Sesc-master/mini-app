import React from "react";
import {PanelHeader} from "@vkontakte/vkui";
  

// import '@vkontakte/vkui/dist/vkui.css';

const AppHeader = () : JSX.Element => {
    return(
        <PanelHeader style={{width: '100vw'}} fixed={false}>SESC Master</PanelHeader>
    )
}

export default AppHeader;