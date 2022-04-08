import axios from "axios";

export default async function httpsRequest(options: any): Promise<any> {
    return axios(options);
}