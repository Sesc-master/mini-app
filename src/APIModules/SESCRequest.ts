import {RequestOptions} from "https";
import {IncomingMessage} from "http";
import httpsRequest from "./HttpsRequest";

export default async function SESCRequest(options: RequestOptions, payload?: string): Promise<{message: IncomingMessage, body: string}> {
    let response = await httpsRequest(options, payload);
    while (response.body.includes("The page is being generated")) {
        await new Promise((resolve) => setTimeout(resolve, 35000));
        response = await httpsRequest(options, payload);
    }
    return response;
}