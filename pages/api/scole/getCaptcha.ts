import buildHandler from "../../../src/APIModules/BuildHandler";
import { scoleRequestArgs } from "../../../src/APIModules/ScoleRequest";
import captchaRequest from "../../../src/APIModules/CaptchaRequest"

const encoding = "base64";

export type Capthca = {
    data: string, ID: string
}

export async function getCaptcha(): Promise<Capthca | "none"> {
    let args = Object.assign({}, scoleRequestArgs);
    args.method = "GET";
    args.path = "/cpt.a"
    return captchaRequest(args, encoding).then(response => {
        let captchaID = response.message.headers["x-cpt"];
        let mime = response.message.headers["content-type"];
        if (typeof captchaID === "string" && mime) {
            return {
                data: "data:" + mime + ";" + encoding + "," + response.body,
                ID: captchaID
            }
        }
        else {
            return "none";
        }
    })
}

export default buildHandler(getCaptcha, false);