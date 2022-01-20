import buildHandler from "../../../src/APIModules/BuildHandler";
import httpsRequest from "../../../src/APIModules/HttpsRequest";
import reviver from "../../../src/APIModules/JSONReviver";
import { scoleRequestArgs } from "../../../src/APIModules/ScoleRequest";

export type SessionInfo = {
    roles: Array<string>;
    token: string
}

export interface ILoginArgs {
    login: string;
    password: string;
    type: string;
    captcha: string | number;
    captchaID: string | number;
}

export async function login(args: ILoginArgs): Promise<SessionInfo | "none"> {
    return httpsRequest(scoleRequestArgs, JSON.stringify({
        f: "login",
        l: args.login,
        p: args.password,
        t: args.type,
        c: String(args.captcha),
        ci: String(args.captchaID)
    })).then(response => {
        if (response.body === "none") return "none";
        else{
            return JSON.parse(response.body, reviver([["roles", "token"]]))
        }
    });
}

export default buildHandler(login);