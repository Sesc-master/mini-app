import buildHandler from "../../../src/APIModules/BuildHandler";
import httpsRequest from "../../../src/APIModules/HttpsRequest";
import { scoleRequestArgs } from "../../../src/APIModules/ScoleRequest";

const mime = "image/png";
const encoding = "base64";

export type Capthca = {
    URI: string, ID: string
}

export async function getCaptcha(): Promise<Capthca | "none"> {
    let args = scoleRequestArgs;
    args.method = "GET";
    args.path = "/cpt.a"
    return httpsRequest(args).then(response => {
        let captchaID = response.message.headers["x-cpt"];
        if (typeof captchaID === "string") {
            return {
                URI: "data:" + mime + ";" + encoding + "," + Buffer.from(response.body).toString(encoding),
                ID: captchaID
            }
        }
        else {
            return "none";
        }
    })
}

export default buildHandler(getCaptcha, false);