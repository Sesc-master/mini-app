import React from "react";
import Installation from "./Installation";


export default function ShowInstaller(component: JSX.Element){
    let isPWA = window.matchMedia('(display-mode: standalone)').matches
    if (!isPWA) {
        return (
            <Installation />
        )
    }
    return (
        <>
            component
        </>
    )

}
