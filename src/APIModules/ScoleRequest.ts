import httpsRequest from "./HttpsRequest";

const server: string = "lycreg.urfu.ru";
const timeout: number = 750;

export interface IBaseRequestArgs {
    login: string, token: string, type: string
}

export default async function scoleRequest(method: string, defaultArgs: IBaseRequestArgs, args?: any): Promise<string> {
    return httpsRequest({
        rejectUnauthorized: false,
        hostname: server,
        method: "POST",
        timeout: timeout
    }, JSON.stringify({
        f: method,
        l: defaultArgs.login,
        p: defaultArgs.token,
        t: defaultArgs.type,
        z: args
    }));
}