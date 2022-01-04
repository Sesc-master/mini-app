import { get, globalAgent } from "https";
import * as http from "http";
globalAgent.options.rejectUnauthorized = false;

export default async function proxy(req, res, method) {
    if (req.method === "get") {
        try {
            await get(req.query.url, response => {

                res.status(200).send(response);
            })
        } catch (er){
            res.status(500).send(er);
        }
    } else if (req.method === "post") {
        try {
            await http.request(req.query.url, response => {

                res.status(200).send(response);
            })
        } catch (er){
            res.status(500).send(er);
        }
    }


}