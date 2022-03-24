import replacer from "./JSONReplacer";

export default function buildHandler(apiFunction: (args?: any) => Promise<any> | any, requiedArgs: boolean = true) {
    return async (req: any, res: any): Promise<void> => {
        let apiFunctionResult: any;
        if (requiedArgs) {
            let APIArgs: any;
            if (typeof req.body == "string") APIArgs = JSON.parse(req.body);
            else APIArgs = req.body;
            apiFunctionResult = apiFunction(APIArgs);
        } else apiFunctionResult = apiFunction();

        const handle = (result: any) => {
            if (result === "none" || !result) res.status(401).send("");
            else res.status(200).send(JSON.stringify(result, replacer));
        }

        if (apiFunctionResult instanceof Promise) {
            return apiFunctionResult.then(handle);
        }
        return new Promise<void>((resolve, reject) => {
            handle(apiFunctionResult);
            resolve();
        })
    }
}