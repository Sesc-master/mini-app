export default function replacer(key: string, value: any) {
    if (value instanceof Map) {
        return Object.fromEntries(value.entries());
    }
    else {
        return value;
    }
}