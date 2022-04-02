import React from "react";
import Installation from "./installation/Installation";
import {useStore} from "effector-react";
import {appSettingsStore} from "../modules/effector/AppSettingsSrore";


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
