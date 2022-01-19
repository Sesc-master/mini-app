import {getJournal, login, getCaptcha} from "./ScoleAPI"
import { resolve } from "./resolve"


export async function getDiary(userName : string, password : string, type : string) {
    const {URI, ID} : any = await getCaptcha()

    const captchaCode = await resolve(URI)

    const loginData : any = await login(userName, password, type, captchaCode, ID)

    const journal = await getJournal(userName, loginData.token, type)

    return {journal: journal, token: loginData.token}
}
