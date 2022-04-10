import axios from "axios";

export default async function SESCRequest(options: any): Promise<any> {
    let response = await axios(options);
    while (response.data.includes("The page is being generated")) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        response = await axios(options);
    }
    return response;
}