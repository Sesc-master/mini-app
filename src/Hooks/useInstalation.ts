import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Page} from '../Modules/Routes'


export default function useInstallation(){
    const navigate = useNavigate()
    useEffect(() => {
        let isPWA = window.matchMedia('(display-mode: standalone)').matches
        if (!isPWA) {
            navigate(Page.Installation)
        }
    }, [])
}
