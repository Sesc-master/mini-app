import React from 'react';
import Drawer from '@mui/material/Drawer';
import {setModalView} from "../../modules/effector/AppSettingsSrore";
import {Modal as ModalName} from "../../modules/Modal";
import Modal from '@mui/material/Modal';
import {useStore} from "effector-react";
import {appSettingsStore} from "../../modules/effector/AppSettingsSrore";
import Paper from "@mui/material/Paper";

type IModalPage = {
    children: JSX.Element,
    name: ModalName,
}

const ModalPage = ({children, name} : IModalPage)=> {
    const {modalView} = useStore(appSettingsStore);
    const width = document.documentElement.clientWidth;
    const toggleDrawer =
        (name: ModalName | "") =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setModalView(name);
            };

    return (
        <>
            {width <= 770 ? (
                <Drawer
                    anchor={"bottom"}
                    open={modalView === name}
                    onClose={toggleDrawer("")}
                >
                    {children}
                </Drawer>
            ) : (
                <Modal
                    sx={{width: "30em", minHeight: "10em", left: "calc(50% - 15em)", top: "40%"}}
                    open={modalView === name}
                    onClose={toggleDrawer("")}
                >
                    <Paper>
                        {children}
                    </Paper>
                </Modal>
            )}
        </>
    );
};

export default ModalPage;