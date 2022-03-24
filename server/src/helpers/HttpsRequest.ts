import { IncomingMessage } from "http";
import { request, RequestOptions } from "https";

export default async function httpsRequest(options: RequestOptions, payload?: string): Promise<{message: IncomingMessage, body: string}> {
    return new Promise((resolve, reject) => {
        let scoleRequest = request(options, response => {
            let body = Buffer.alloc(0);

            response.on("data", (chunk: Buffer) => {
                body = Buffer.concat([body, chunk]);
            });
            response.on("end", () => {
                resolve({
                    message: response,
                    body: body.toString()
                });
            });

            response.on("error", (error) => {
                reject(error);
            });
        });

        scoleRequest.on("timeout", () => reject("timeout"));

        if (payload) scoleRequest.write(payload);
        scoleRequest.end();
    });
}