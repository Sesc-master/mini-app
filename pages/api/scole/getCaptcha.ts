import buildHandler from "../../../src/APIModules/BuildHandler";
import httpsRequest from "../../../src/APIModules/HttpsRequest";
import { scoleRequestArgs } from "../../../src/APIModules/ScoleRequest";
import captchaRequest from "../../../src/APIModules/CaptchaRequest"

const mime = "image/png";
const encoding = "base64";

export type Capthca = {
    URI: string, ID: string
}

export async function getCaptcha(): Promise<Capthca | "none"> {
    let args = Object.assign({}, scoleRequestArgs);
    args.method = "GET";
    args.path = "/cpt.a"
    return captchaRequest(args).then(response => {
        let captchaID = response.message.headers["x-cpt"];
        if (typeof captchaID === "string") {
            return {
                URI: response.body,
                ID: captchaID
            }
        }
        else {
            return "none";
        }
    })
}

export default buildHandler(getCaptcha, false);