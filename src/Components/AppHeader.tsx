import React from 'react';
import {PanelHeader} from "@vkontakte/vkui";
  

import '@vkontakte/vkui/dist/vkui.css';

const AppHeader = () => {
    return(
        <PanelHeader fixed={false} style={{fontFamily: 'sans-serif'}}>SESC Master</PanelHeader>
    )
}

export default AppHeader;