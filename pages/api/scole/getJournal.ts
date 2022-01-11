import scoleRequest, { IBaseRequestArgs } from "../../../src/APIModules/ScoleRequest"
import { getSubjectsList } from "./getSubjectsList";
import { getTeachersList, Teacher } from "./getTeachersList";
import dateConvert from "../../../src/APIModules/DateConvert";
import reviver from "../../../src/APIModules/JSONReviver";
import buildHandler from "../../../src/APIModules/BuildHandler";

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

export async function getJournal(args: IBaseRequestArgs) {
    return Promise.all([getSubjectsList(args), getTeachersList(args), scoleRequest("jrnGet", args, [])]).then(responses => {
        var result = new Map<string, Subject>();
        let [subjects, teachers, journalStr] = responses;
        
        if (subjects === "none" || teachers === "none" || journalStr === "none") return "none";

        let journal: Map<string, Map<string, [string, string, number, string?]>> = JSON.parse(journalStr, reviver([]));
        journal.forEach((journalNotes, teacher) => {
            let [className, subjectId, teacherLogin] = teacher.split("_");

            let subjectName = subjects.get(subjectId);
            let teacherName = teachers.find(teacherObject => teacherObject.login === teacherLogin)?.fio;

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
                if (firstmonth === secondmonth) {
                    return Number(firstNote.date.substring(0, 2)) - Number(secondNote.date.substring(0, 2));
                }

                return monthsOrder.indexOf(firstmonth) - monthsOrder.indexOf(secondmonth);
            });
        });
        return result;
    });
}

export default buildHandler(getJournal);