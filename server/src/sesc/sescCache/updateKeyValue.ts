import {CacheKey} from "./cacheKey";
import {shouldKeyUpdate} from "./shouldKeyUpdate";
import {set} from "../../database";
import {setKeyTimeout} from "./setKeyTimeout";

export const updateKeyValue = async (key: CacheKey, getValue: () => Promise<any>) => {

    if (await shouldKeyUpdate(key)) {
        const value = await getValue();
        await set(key, value);
        await setKeyTimeout(key);
    }
}
