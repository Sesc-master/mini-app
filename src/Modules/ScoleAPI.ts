import { Absent } from "../../pages/api/scole/getAbsences";
import { Capthca } from "../../pages/api/scole/getCaptcha";
import { Document } from "../../pages/api/scole/getDocuments";
import { Journal } from "../../pages/api/scole/getJournal";
import { Note } from "../../pages/api/scole/getNotes";
import { ReportCard } from "../../pages/api/scole/getReportCard";
import { Teacher } from "../../pages/api/scole/getTeachersList";
import { SessionInfo } from "../../pages/api/scole/login";
import reviver from "../APIModules/JSONReviver";

async function APIRequest(method: string, args: any, APIObjectsProperties?: Array<Array<string>>): Promise<any | undefined> {
    return fetch("/api/scole/" + method, {
        body: JSON.stringify(args),
        method: "POST",
        headers: { "Content-Type": "application/json" }
    }).then(response => {
        if (!response.ok) return undefined;
        else return response.text()
    }).then(responseText => {
        if (responseText) return JSON.parse(responseText, reviver(APIObjectsProperties));
        else return undefined;
    });
}

export async function login(login: string, password: string, type: string, captcha: string | number, captchaID: string | number): Promise<SessionInfo | undefined> {
    return APIRequest("login", { login, password, type, captcha, captchaID }, [["token", "roles"]]);
}

export async function getCaptcha(): Promise<Capthca | undefined> {
    return APIRequest("getCaptcha", "", [["URI", "ID"]]);
}

export async function getAbsences(login: string, token: string, type: string, className?: string): Promise<Map<string, Array<Absent>> | undefined> {
    let argsObject: any = { login, token, type };
    if (className) argsObject["class"] = className;
    else argsObject["pupil"] = login;
    return APIRequest("getAbsences", argsObject, [["date", "subject", "pupil", "abs"]]);
}

export async function getDocuments(login: string, token: string, type: string): Promise<Array<Document> | undefined> {
    return APIRequest("getDocuments", { login, token, type }, [["class", "pupil", "type", "dateStart", "dateEnd", "prim", "id"]]);
}

export async function getJournal(login: string, token: string, type: string): Promise<Journal | undefined> {
    return APIRequest("getJournal", { login, token, type }, [
        ["teacher", "notes"], ["date", "theme", "hometask", "coefficient", "grades"]
    ]);
}

export async function getNotes(login: string, token: string, type: string, userNotes: boolean = false): Promise<Array<Note> | undefined> {
    let argsObject: any = { login, token, type };
    if (!userNotes) argsObject["pupil"] = login;
    return APIRequest("getNotes", argsObject, [["author", "authorLogin", "to", "toID", "text", "date", "id"]]);
}

export async function getReportCard(login: string, token: string, type: string, target: string = login): Promise<ReportCard | undefined> {
    return APIRequest("getReportCard", {login, token, type, target});
}

export async function getSubjectsList(login: string, token: string, type: string, target: string = login): Promise<Map<string, string> | undefined> {
    return APIRequest("getSubjectsList", {login, token, type, target});
}

export async function getTeachersList(login: string, token: string, type: string): Promise<Array<Teacher> | undefined> {
    return APIRequest("getTeachersList", {login, token, type});
}