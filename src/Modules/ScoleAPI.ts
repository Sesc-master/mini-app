import {Role} from "./ScoleAPI/types/Role";
import {Subjects} from "./ScoleAPI/types/Subjects";
import {Absences} from "./ScoleAPI/types/Absences";
import convertAbsences from "./ScoleAPI/converters/absences";
import reviver from "../APIModules/JSONReviver";
import {Documents} from "./ScoleAPI/types/Documents";
import convertDocuments from "./ScoleAPI/converters/documents";
import {Teacher} from "./ScoleAPI/types/Teacher";
import {Journal} from "./ScoleAPI/types/Journal";
import convertJournal from "./ScoleAPI/converters/journal";
import {Notes} from "./ScoleAPI/types/Notes";
import convertNotes from "./ScoleAPI/converters/notes";
import {ReportCard} from "./ScoleAPI/types/ReportCard";
import convertReportCard from "./ScoleAPI/converters/reportCard";
import {LoginInfo} from "./ScoleAPI/types/LoginInfo";
import {Captcha} from "./ScoleAPI/types/Captcha";

async function scoleRequest(methodName: string, login: string, token: string, role: Role, args?: Array<string>, reviverObjects?: Array<Array<string>>): Promise<any | "none"> {
    let requestBody: any = {
        f: methodName,
        l: login,
        p: token,
        t: role
    }
    if (args) requestBody.z = args;

    return fetch("https://lycreg.urfu.ru", {
        method: "POST",
        body: JSON.stringify(requestBody)}
    ).then(response => response.text()).then(body => {
        if (body === "none") return undefined;
        else return JSON.parse(body, reviver(reviverObjects));
    });
}


const defaultSubjects: Map<string, string> = new Map([
    ["s110", "Русский язык"],
    ["s120", "Литература"],
    ["s210", "Английский язык"],
    ["s220", "Немецкий язык"],
    ["s230", "Французский язык"],
    ["s310", "Искусство"],
    ["s320", "МХК"],
    ["s330", "Музыка"],
    ["s410", "Математика"],
    ["s420", "Алгебра"],
    ["s430", "Алгебра и начала анализа"],
    ["s440", "Геометрия"],
    ["s450", "Информатика"],
    ["s510", "История"],
    ["s520", "История России"],
    ["s530", "Всеобщая история"],
    ["s540", "Обществознание"],
    ["s550", "Экономика"],
    ["s560", "Право"],
    ["s570", "География"],
    ["s610", "Физика"],
    ["s620", "Астрономия"],
    ["s630", "Химия"],
    ["s640", "Биология"],
    ["s710", "Технология"],
    ["s810", "Физическая культура"],
    ["s820", "ОБЖ"]
]);

var subjectListCache: Subjects = new Map();

export async function getSubjectList(login: string, token: string, role: Role): Promise<Subjects | undefined> {
    return scoleRequest("subjList", login, token, role).then(subjects => {
        if (subjects) {
            defaultSubjects.forEach((name, id) => subjects.set(id, name));
            subjectListCache = subjects;
            return subjects;
        }
        else return undefined;
    });
}

var teachersListCache: Array<Teacher> = [];

export async function getTeachersList(login: string, token: string, role: Role): Promise<Array<Teacher> | undefined> {
    return scoleRequest("teachList", login, token, role, undefined, [["login", "fio"]]).then(teachers => {
        if (teachers) {
            teachersListCache = teachers;
            return teachers;
        }
        else return undefined;
    })
}


export async function getCaptcha(): Promise<Captcha> {
    let headers: Headers;
    return fetch("https://lycreg.urfu.ru/cpt.a")
        .then(response => {
            headers = response.headers
            return response.blob()
        })
        .then(blob => {
            return new Promise((resolve, reject) => {
                var reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                    resolve({
                        ID: Number(headers.get("x-cpt")),
                        data: reader.result as string
                    });
                }
            });
    });
}

export async function login(login: string, password: string, role: Role, captcha: number | string, captchaID: number | string): Promise<LoginInfo | undefined> {
    return fetch("https://lycreg.urfu.ru/", {
        method: "POST",
        body: JSON.stringify({
        f: "login",
        l: login,
        p: password,
        t: role,
        c: captcha.toString(),
        ci: captchaID.toString()
    })}).then(response => response.text()).then(body => {
        if (body == "none") return undefined;
        else return JSON.parse(body, reviver([["roles", "token"]]));
    });
}

export async function getJournal(login: string, token: string, role: Role, subjects: Subjects = subjectListCache, teachers: Array<Teacher> = teachersListCache): Promise<Journal | undefined> {
    return scoleRequest("jrnGet", login, token, role, [], [])
        .then(goldinJournal => convertJournal(goldinJournal, subjects, teachers));
}

export async function getNotes(login: string, token: string, role: Role, pupil: string | "" = login): Promise<Notes | undefined> {
    return scoleRequest("notesGet", login, token, role, [pupil], [["dt", "r", "rf", "t", "a", "af", "_id"]])
        .then(convertNotes);
}

export async function getReportCard(login: string, token: string, role: Role, subjects: Subjects = subjectListCache, target: string = login): Promise<ReportCard | undefined> {
    return scoleRequest("tabelGet", login, token, role, [target], [])
        .then(goldinReportCard => convertReportCard(goldinReportCard, subjects));
}

export async function getDocuments(login: string, token: string, role: Role, target: string = login): Promise<Documents | undefined> {
    return scoleRequest("sprGet", login, token, role, [role], [[
        "Uclass", "pupil", "vid", "start", "fin", "prim", "_id"
    ]]).then(convertDocuments);
}

export async function getAbsences(login: string, token: string, role: Role, subjects: Subjects = subjectListCache, pupil: string = login, className?: string): Promise<Absences | undefined> {
    return scoleRequest("absentGet", login, token, role, [className || "", pupil || ""], [["d", "s", "p", "abs"]])
        .then(goldinAbsences => convertAbsences(goldinAbsences, subjects));
}