import {setScheme as changeScheme} from "../modules/effector/AppSettingsSrore";
import {StorageKey} from "../modules/StorageKey";
import {Appearance} from "../modules/Appearance";

export const useSetScheme = (scheme: Appearance) => {
    changeScheme(scheme)
    localStorage.setItem(StorageKey.Scheme, scheme)
}
