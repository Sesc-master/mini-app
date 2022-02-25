import React, {useEffect, useState} from "react";
import Installation from "./Installation";
import {useStore} from "effector-react";
import {appSettingsStore} from "../Modules/Effector/AppSettingsSrore";


export default function ShowInstaller(Component: JSX.Element){
    const {isPWA} = useStore(appSettingsStore)

    if (!isPWA) {
        return (
            <>
                <Installation />
            </>
        )
    }
    return Component;
}
