import { NextApiRequest, NextApiResponse } from "next";
import replacer from "./JSONReplacer";

export default function buildHandler(apiFunction: (args: any) => Promise<"none" | any>) {
    return async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        return apiFunction(req.body).then(response => {
            if (response === "none") res.status(401).send("");
            else res.status(200).send(JSON.stringify(response, replacer));
        })
    }
}