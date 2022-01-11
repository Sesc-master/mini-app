import scoleRequest, { IBaseRequestArgs } from "../../../src/APIModules/ScoleRequest"
import reviver from "../../../src/APIModules/JSONReviver";
import buildHandler from "../../../src/APIModules/BuildHandler";

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

export async function getSubjectsList(args: IBaseRequestArgs) {
    return scoleRequest("subjList", args)
        .then(response => {
            if (response === "none") return response;
            else {
                let subjects: Map<string, string> = JSON.parse(response, reviver([]));
                defaultSubjects.forEach((name, id) => subjects.set(id, name));
                return subjects;
            }
        });
}

export default buildHandler(getSubjectsList);