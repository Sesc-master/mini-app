import { get, globalAgent } from "https";
import {resolve} from "./resolve";

export default async function getCaptcha() {
    return new Promise((res, rej) => {
        get("https://lycreg.urfu.ru/cpt.a", (cptRes : any) => {
            let result : any;
            const id = cptRes.headers["x-cpt"]
            cptRes
                .on("data", function(chunk : any) {
                    result = chunk;
                })
                .on("end", function() {
                    const mime = "image/png";
                    const encoding = "base64";
                    let uri = "data:" + mime + ";" + encoding + "," + result.toString(encoding);
                    resolve(uri).then((value) => {
                        res({value, id});
                    })
                })
        })
    })
}