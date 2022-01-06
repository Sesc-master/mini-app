import { get, globalAgent } from "https";
import * as http from "http";
globalAgent.options.rejectUnauthorized = false;

export default async function proxy(req, res) {
    if (req.method === "GET") {
        try {
            await get(req.query.url, response => {

                res.status(200).send(response);
            })
        } catch (er){
            res.status(500).send(er);
        }
    } else if (req.method === "POST") {
        try {
            await http.request(req.query.url, response => {

                res.status(200).send(response);
            })
        } catch (er){
            res.status(500).send(er);
        }
    }


}