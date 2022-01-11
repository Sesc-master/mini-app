import { request } from "https";

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

export type UserType = "root" | "admin" | "teacher" | "tutor" | "pupil" | "par" | 'parent'

var server: string = "lycreg.urfu.ru";

var APIObjectsProperties: Array<Array<string>> = [];

async function apiRequest(method: string, login: string, pass: string, type: UserType,
args?: string[] | string, capthca?: string | number, capthcaId?: string | number): Promise<any | string> {
    return new Promise((resolve, reject) => {
        let requestBody: any = { f: method, l: login, p: pass, t: type };
        if (args) requestBody["z"] = args;

        if (capthca) requestBody["c"] = String(capthca);
        if (capthcaId) requestBody["ci"] = String(capthcaId);

        let req = request(`https://${server}/`, {method: "POST"}, res => {
            var responseBody = "";
            res.on("data", chunk => {
                responseBody += chunk;
            });
            res.on("end", () => {
                try {
                    resolve(JSON.parse(responseBody, (key, value) => {
                        if (typeof value == "object" && !(value instanceof Array)) {
                            for (let possibleObjectProperties of APIObjectsProperties) {
                                let hasAllProperties = possibleObjectProperties.every(property => value.hasOwnProperty(property))
                                if (hasAllProperties) return value;
                            }
                            return new Map(Object.entries(value));
                        }
                        else return value;
                    }));
                } catch (e) {
                    resolve(responseBody);
                }
            });
        });
        req.write(JSON.stringify(requestBody));
        req.end()
    });
}

export async function authorise(login: string, password: string, type: UserType,
captcha: string | number, capthcaId: string | number): Promise<{ roles: UserType[]; token: string; teachLoad: Map<string, Array<string>>; tutClss: Array<string>}> {
    return apiRequest("login", login, password, type, undefined, captcha, capthcaId);
}

type teacher = {
    login: string;
    fio: string
}
APIObjectsProperties.push(["login", "fio"]);
export async function teachList(login: string, token: string, type: UserType): Promise<Array<teacher>> {
    return apiRequest("teachList", login, token, type);
}

export async function subjList(login: string, token: string, type: UserType): Promise<Map<string, string>> {
    return apiRequest("subjList", login, token, type)
}

export async function jrnGet(login: string, token: string, type: UserType): Promise<Map<string, Map<string, [string, string, number, string?]>>> {
    return apiRequest("jrnGet", login, token, type, []);
}

export async function absentGet(login: string, token: string, type: UserType, className: string = "",
pupil: string): Promise<Array<{d: string, s: string, p: string, abs: number}>> {
    return apiRequest("absentGet", login, token, type, [className, pupil]);
}

//TODO: check returning type of sprGet
export async function sprGet(login: string, token: string, type: UserType, pupil: string) {
    return apiRequest("sprGet", login, token, type, [pupil]);
}

//TODO: sprResp
export async function sprResp(login: string, token: string, type: UserType) {
    
}

export async function tabelGet(login: string, token: string, type: UserType, pupil: string): Promise<Map<string, Map<string, string>>> {
    return apiRequest("tabelGet", login, token, type, [pupil]);
}

//TODO: notesGet
type note = {
    dt: string;
    r: string; rf: string;
    t: string;
    a: string; af: string;
    _id: string;
}
APIObjectsProperties.push(["dt", "r", "rf", "t", "a", "af", "_id"]);
export async function notesGet(login: string, token: string, type: UserType, pupil: string = ""): Promise<Array<note> | "none"> {
    return apiRequest("notesGet", login, token, type, [pupil]);
}

export async function notesCheck(login: string, token: string, type: UserType): Promise<actionResult> {
    return apiRequest("notesCheck", login, token, type, [login]);
}

type admin = {
    Ulogin: string;
    Ufamil: string;
    Uname: string;
    Uotch: string;
    Upwd: string;
    _id: string;
    admin: boolean;
}
APIObjectsProperties.push(["Ulogin", "Ufamil", "Uname", "Uotch", "Upwd", "_id", "admin"]);
export async function adminsList(login: string, token: string, type: UserType): Promise<Array<admin> | "none"> {
    return apiRequest("adminsList", login, token, type);
}

export async function attendGet(login: string, token: string, type: UserType, day: string): Promise<Map<string, Map<string, Array<string>>>> {
    return apiRequest("attendGet", login, token, type, [day]);
}

type actionResult = "success" | " none"

export async function classAdd(login: string, token: string, type: UserType, className: string): Promise<actionResult> {
    return apiRequest("classAdd", login, token, type, className);
}

export async function classDel(login: string, token: string, type: UserType, className: string): Promise<actionResult> {
    return apiRequest("classDel", login, token, type, className);
}

//TODO: check returning type
export async function classesGroups(login: string, token: string, type: UserType): Promise<Array<string> | "none"> {
    return apiRequest("classesGroups", login, token, type);
}

export async function classesList(login: string, token: string, type: UserType): Promise<Array<string>> {
    return apiRequest("classesList", login, token, type);
}

export async function distrEdit(login: string, token: string, type: UserType, action: "add" | "del",
teacher: string, subject: string, className: string): Promise<actionResult> {
    return apiRequest("distrEdit", login, token, type, [action, teacher, subject, className]);
}

export async function distrGet(login: string, token: string, type: UserType): Promise<Map<string, Map<string, Array<string>>>> {
    return apiRequest("distrGet", login, token, type);
}

export async function electGet(login: string, token: string, type: UserType, pupil: string): Promise<Map<string, Map<string, string>>> {
    return apiRequest("electGet", login, token, type, [pupil]);
}

//TODO: descride returning type
export async function _export(login: string, token: string, type: UserType, className: string) {
    return apiRequest("export", login, token, type, [className]);
}

export async function gradeAdd(login: string, token: string, type: UserType, date: string, className: string,
subject: string, pupil: string, grade: string, pin: string, teacher: string): Promise<"success" | "none" | "pupBlock" | "pinBad"> {
    return apiRequest("gradeAdd", login, token, type, [date, className, subject, pupil, grade, pin, teacher]);
}

//TODO: descride returning type
export async function gradesGet(login: string, token: string, type: UserType, className: string, subject: string, teacher: string): Promise<any> {
    return apiRequest("gradesGet", login, token, type, [className, subject, teacher]);
}

export async function interGroupDel(login: string, token: string, type: UserType, groupName: string): Promise<actionResult> {
    return apiRequest("interGroupDel", login, token, type, [groupName]);
}

export async function interGroupEdit(login: string, token: string, type: UserType, groupName: string, fullName: string, teacher: string): Promise<actionResult> {
    return apiRequest("interGroupEdit", login, token, type, [groupName, fullName, teacher]);
}

