export default function reviver(APIObjectsProperties: Array<Array<string>>) {
    return (key: string, value: any): any => {
        if (typeof value == "object" && !(value instanceof Array)) {
            for (let possibleObjectProperties of APIObjectsProperties) {
                let hasAllProperties = possibleObjectProperties.every(property => value.hasOwnProperty(property))
                if (hasAllProperties) return value;
            }
            return new Map(Object.entries(value));
        }
        else return value;
    }
}