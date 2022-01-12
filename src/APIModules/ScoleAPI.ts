import { jrnGet, subjList, teachList, UserType } from "./ScoleRawAPI";

export const getTeachersList = teachList;

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

export async function getSubjectsList(login: string, token: string, type: UserType) {
    return subjList(login, token, type).then(subjects => {
        defaultSubjects.forEach((name, id) => subjects.set(id, name));
        return subjects;
    })
}

type Subject = {
    teacher: string;
    notes: Array<SubjectNote>;
}

type SubjectNote = {
    date: string;
    theme: string;
    hometask: string;
    coefficient: number;
    grades?: string;
}

function dateConvert (dateInput: string, full: boolean) {
    if (dateInput.includes("-")) {
        let dateArray = dateInput.split("-");
        let year = dateArray[0];
        let monthNum = Number(dateArray[1]);
        let day = dateArray[2];
        let month = monthNum > 8 ? monthNum - 9 : monthNum + 3;
        return `${month}${day}`
    }
    else if (dateInput.includes(".")) {
        let dateArray = dateInput.split(".");
        let day = dateArray[0];
        let monthNum = Number(dateArray[1]);
        let month = monthNum > 8 ? monthNum - 9 : monthNum + 3;
        return `${month}${day}`
    }
    else {
        let monthNum = Number(dateInput.substr(1, 1));
        let day = dateInput.substr(2, 2);
        let month = String(monthNum < 4 ? monthNum + 9 : monthNum - 3);
        month = month.toString().padStart(2, "0");
        if (full) {
            let dateObject = new Date(),
                year = dateObject.getFullYear(),
                currentmonth = dateObject.getMonth() + 1;
            if (monthNum < 4 && currentmonth < 8) year--;
            return `${year}-${month}-${day}`
        }
        else return `${day}.${month}`
    }
}

export async function getJournal(login: string, token: string, type: UserType): Promise<Map<string, Subject>> {
    return Promise.all([getSubjectsList(login, token, type), getTeachersList(login, token, type), jrnGet(login, token, type)]).then(apiResponses => {
        var result = new Map<string, Subject>();
        let [subjects, teachers, journal] = apiResponses;
        
        journal.forEach((journalNotes, teacher) => {
            let [className, subjectId, teacherLogin] = teacher.split("_");

            let subjectName = subjects.get(subjectId);
            let teacherName = teachers.find(teacherObject => teacherObject.login == teacherLogin)?.fio;

            result.set(<string>subjectName, { teacher: <string>teacherName, notes: [] });
            journalNotes.forEach((note, day) => {
                let newNote: SubjectNote = {
                    date: dateConvert(day, false),
                    theme: note[0],
                    hometask: note[1],
                    coefficient: note[2],
                };
                if (note[3]) newNote.grades = note[3];
                result.get(<string>subjectName)?.notes.push(newNote);
            });
            result.get(<string>subjectName)?.notes.sort((firstNote, secondNote) => {
                const monthsOrder = [9, 10, 11, 12, 1, 2, 3, 4, 5, 6, 7, 8]
                let firstmonth = Number(firstNote.date.substring(3, 5));
                let secondmonth = Number(secondNote.date.substring(3, 5));
                if (firstmonth == secondmonth) {
                    return Number(firstNote.date.substring(0, 2)) - Number(secondNote.date.substring(0, 2));
                }

                return monthsOrder.indexOf(firstmonth) - monthsOrder.indexOf(secondmonth);
            });
        });
        // console.log(result)
        return result;
    });
}