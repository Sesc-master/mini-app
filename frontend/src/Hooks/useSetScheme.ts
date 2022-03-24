import {setScheme as changeScheme} from "../Modules/Effector/AppSettingsSrore";
import {StorageKey} from "../Modules/StorageKey";
import {Appearance} from "../Modules/Appearance";

export const useSetScheme = (scheme: Appearance) => {
    changeScheme(scheme)
    localStorage.setItem(StorageKey.Scheme, scheme)
}
