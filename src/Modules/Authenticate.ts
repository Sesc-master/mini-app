import request from './ProxyModule'

export default async function Authenticate(login : string, password : string, type : string | number) {
    const captcha: any = await fetch('/api/captcha');
    const apiOptions: any = {method: "POST", cache: "no-cache", body: ''};

    apiOptions.body = `{
         "t":  "${type}",
         "l":  "${login}",
         "p":  "${password}",
         "f":  "login",
         "ci": "${captcha.id}",
         "c":  "${captcha.value}"
      }`;
    const apiResponse = await (await fetch("/", apiOptions)).text();
    if (apiResponse == "none") {
        throw new Error('auth error');
    } else {
        return JSON.parse(apiResponse);
    }

}