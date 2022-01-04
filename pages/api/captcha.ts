import { get, globalAgent } from "https";
import {resolve} from "./resolve";

globalAgent.options.rejectUnauthorized = false

export default async function captchaAPI(req, res) {
    try {
        await get("https://lycreg.urfu.ru/cpt.a", (cptRes : any) => {
            let result;
            const id = cptRes.headers['x-cpt']
            cptRes
                .on('data', function(chunk) {
                    result = chunk;
                })
                .on('end', function() {
                    const mime = 'image/png';
                    const encoding = 'base64';
                    let uri = 'data:' + mime + ';' + encoding + ',' + result.toString(encoding);
                    resolve(uri).then((value) => {
                        res.status(200).json({value , id})
                    })
                })
        });
    } catch (err){
        res.status(500).send(err)
    }

}