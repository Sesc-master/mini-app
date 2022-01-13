import { RequestOptions } from "https";
import httpsRequest from "./HttpsRequest";

const server: string = "lycreg.urfu.ru";
const timeout: number = 750;

export interface IBaseRequestArgs {
    login: string, token: string, type: string
}

export const scoleRequestArgs: RequestOptions = {
    rejectUnauthorized: false,
    hostname: server,
    method: "POST",
    timeout: timeout,
    protocol: "https:"
}

export default async function scoleRequest(method: string, defaultArgs: IBaseRequestArgs, args?: any): Promise<string> {
    return httpsRequest(scoleRequestArgs, JSON.stringify({
        f: method,
        l: defaultArgs.login,
        p: defaultArgs.token,
        t: defaultArgs.type,
        z: args
    })).then(res => res.body);
}