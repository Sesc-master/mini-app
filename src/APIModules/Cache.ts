class CachedValue<StoreType> {
    value: StoreType;
    time: number;
    expire: number;
    constructor(value: StoreType, expire: number) {
        this.value = value;
        this.time = Date.now();
        this.expire = expire;
    }
    isExpired(): boolean {
        return Date.now() - this.time > this.expire;
    }
    update(value: StoreType): void {
        this.value = value;
        this.time = Date.now();
    }
}

var cache = new Map<string, CachedValue<any>>();

const defaultExpireTime = 3600000;

type CachableFunction<StoreType> = (...args: any) => Promise<StoreType>;

export default function buildCachedFunction<StoreType>(func: CachableFunction<StoreType>, key: string,
    expire: number = defaultExpireTime): CachableFunction<StoreType> {
    return async (...args): Promise<StoreType> => {
        if (!cache.has(key) || cache.get(key)?.isExpired()) {
            return func(...args).then(value => {
                if (!cache.has(key)) {
                    console.log(`Added cache value to key ${key}`);
                    cache.set(key, new CachedValue(value, expire));
                }
                else if (cache.get(key)?.isExpired()) {
                    console.log(`Updated cache value to key ${key}`);
                    cache.get(key)?.update(value);
                }
                return value;
            });
        }
        else {
            console.log(`Return cache value from key ${key}`);
            return new Promise((resolve, reject) => resolve(cache.get(key)?.value));
        }
    }
}