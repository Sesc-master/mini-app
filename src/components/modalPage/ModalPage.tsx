import React from 'react';
import {
    Drawer,
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    SwipeableDrawer
} from '@mui/material';
import {setModalView} from "../../modules/effector/AppSettingsSrore";
import {Modal as ModalName} from "../../modules/Modal";
import Modal from '@mui/material/Modal';
import {useStore} from "effector-react";
import {appSettingsStore} from "../../modules/effector/AppSettingsSrore";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Icon from "../icon/Icon";
import {IconName} from "../icon/IconName";
import {Close} from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Puller from "./Puller";

type IModalPage = {
    children: JSX.Element,
    name: ModalName,
}

const ModalPage = ({children, name} : IModalPage)=> {
    const {modalView} = useStore(appSettingsStore);
    const width = document.documentElement.clientWidth;
    const modalPage =
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
                <SwipeableDrawer
                    anchor={"bottom"}
                    open={modalView === name}
                    onClose={modalPage("")}
                    onOpen={modalPage(name)}
                    disableSwipeToOpen={true}
                    sx={{'& .MuiDrawer-paper':
                            {
                                maxHeight: "90%",
                                minHeight: "25%",
                                borderRadius: "8px 8px 0px 0px"
                            }}}
                    swipeAreaWidth={50}
                >
                    <Puller />
                    {children}
                </SwipeableDrawer>
            ) : (
                <Dialog
                    sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
                    maxWidth="xs"
                    open={modalView === name}
                >
                    <DialogContent  dividers>
                        {children}
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={modalPage("")}>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default ModalPage;