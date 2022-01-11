import { request, RequestOptions } from "https";

export default async function httpsRequest(options: RequestOptions, payload?: string): Promise<string> {
    return new Promise((resolve, reject) => {
        let scoleRequest = request(options, response => {
            let body = Buffer.alloc(0);

            response.on("data", chunk => {
                body = Buffer.concat([body, chunk]);
            });
            response.on("end", () => {
                resolve(body.toString());
            });

            response.on("error", (error) => {
                reject(error);
            });
        });

        scoleRequest.on("timeout", () => reject("timeout"));

        scoleRequest.write(payload);
        scoleRequest.end();
    });
}