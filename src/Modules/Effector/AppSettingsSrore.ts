import {createEvent, createStore} from "effector";
import {IModal} from "../Modal";

export const setModalView = createEvent<IModal>()
export const setScheme = createEvent<string>()

export type IAppSettingsStore = {
    scheme: string,
    modalView: IModal
}

export const appSettingsStore = createStore<IAppSettingsStore>({
    modalView: '',
    scheme: 'client_dark',
})
    .on(setModalView, (state, modalView) => (
        {...state, modalView}
    ))
    .on(setScheme, (state, scheme) => (
        {...state, scheme}
    ))