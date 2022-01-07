import { request } from "https";

const allowedMethods = ["GET", "POST"];
const allowedHosts = ["lycreg.urfu.ru", "lyceum.urfu.ru"];
const requestTimeout = 3000;
const enforceCORS = false;

export default async function proxy(req, res): Promise<void> {
    return new Promise((resolve, reject) => {
        if (req.query.url === undefined) {
            res.status(400).send();
            resolve();
            return;
        }
        
        let url = new URL(req.query.url);
        if (allowedMethods.includes(req.method) && allowedHosts.includes(url.host)) {
            try {
                let proxyReq = request(url, {
                    method: req.method,
                    rejectUnauthorized: false,
                    timeout: requestTimeout
                }, response => {
                    res.status(response.statusCode);

                    if (enforceCORS) {
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        res.setHeader("Access-Control-Allow-Methods", allowedMethods.join(", "));
                    }

                    response.setEncoding("utf-8");
                    response.on("data", (data) => {
                        res.write(data);
                    });
                    response.on("end", () => {
                        res.send();
                        resolve();
                    });

                    response.socket.on("timeout", () => {
                        res.status(504).send();
                    });
                });

                if (req.body) {
                    proxyReq.write(req.body);
                }
                proxyReq.end();
            }
            catch (e) {
                res.status(500).send();
                reject();
            }
        }
        else if (!allowedMethods.includes(req.method)) {
            res.status(405).send();
            resolve();
        }
        else if (!allowedHosts.includes(url.host)) {
            res.status(403).send();
            resolve();
        }
    });
}