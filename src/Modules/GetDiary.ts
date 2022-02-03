import {getJournal, login, getCaptcha, getSubjectList, getTeachersList} from "./ScoleAPI"
import { resolve } from "./resolve"
import {Role} from "./ScoleAPI/types/Role";


export async function getDiary(userName : string, password : string, type : Role) {
    const {data, ID} : any = await getCaptcha()

    const captchaCode = await resolve(data)

    const loginData = await login(userName, password, type, captchaCode, ID)

    if (loginData) {
        await getSubjectList(userName, loginData.token, type);
        await getTeachersList(userName, loginData.token, type);
        const journal = await getJournal(userName, loginData.token, type);

        return {journal: journal, token: loginData.token}
    }
    else return undefined;
}
