import {RequestOptions} from "https";
import {IncomingMessage} from "http";
import httpsRequest from "./HttpsRequest";

export default async function SESCRequest(options: RequestOptions, payload?: string): Promise<{message: IncomingMessage, body: string}> {
    let response;
    try {
        response = await httpsRequest(options, payload);
        while (response.body.includes("Page is being generated.")) {
            await new Promise((resolve) => setTimeout(resolve, 7000));
            response = await httpsRequest(options, payload);
        }
        return response;
    } catch (error: any){
        if (error === "timeout"){
            response = await httpsRequest(options, payload);
            return response;
        }

        throw new Error(error);
    }
}