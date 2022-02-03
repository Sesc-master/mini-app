import { NextApiRequest, NextApiResponse } from "next";
import replacer from "./JSONReplacer";

export default function buildHandler(apiFunction: (args?: any) => Promise<"none" | any>, requiedArgs: boolean = true) {
    return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        let apiFunctionPromise;
        if (requiedArgs) {
            let APIArgs: any;
            if (typeof req.body == "string") APIArgs = JSON.parse(req.body);
            else APIArgs = req.body;
            apiFunctionPromise = apiFunction(APIArgs);
        }
        else apiFunctionPromise = apiFunction();

        return apiFunctionPromise.then(response => {
            if (response === "none" || !response) res.status(401).send("");
            else res.status(200).send(JSON.stringify(response, replacer));
        })
    }
}