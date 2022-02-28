import { parse } from "node-html-parser";
import buildHandler from "../../../src/APIModules/BuildHandler";
import buildCachedFunction from "../../../src/APIModules/Cache";
import SESCRequest from "../../../src/APIModules/SESCRequest";

const ignoringText = [
    "Нет", "Учитель", "Выберите класс", "Выберите аудиторию", "Выберите преподавателя", "Выберите день"
];

export type ParsedIDs = {
    groups: Map<string, number>;
    teachers: Map<string, number>;
    auditories: Map<string, number>;
    weekdays: Map<string, number>;
}

export const getIDs = buildCachedFunction((): Promise<ParsedIDs | void> => {
    return SESCRequest({
        host: "lyceum.urfu.ru",
        path: "/ucheba/raspisanie-zanjatii"
    }).then(lyceumResponse => {
        let result: ParsedIDs = {
            groups: new Map<string, number>(),
            teachers: new Map<string, number>(),
            auditories: new Map<string, number>(),
            weekdays: new Map<string, number>()
        }

        let formElement = parse(lyceumResponse.body).getElementsByTagName("form")[0];
        if (!formElement) return;

        let selectElements = formElement.getElementsByTagName("select");
        selectElements.forEach(selectElement => {
            let selectType: Map<string, number>;

            let selectorType = selectElement.getAttribute("data-name");
            switch (selectorType) {
                case "group": selectType = result.groups; break;
                case "teacher": selectType = result.teachers; break;
                case "auditory": selectType = result.auditories; break;
                case "weekday": selectType = result.weekdays; break;
                default: return;
            }

            let options = selectElement.getElementsByTagName("option");
            options.forEach(option => {
                if (!ignoringText.includes(option.text)) selectType.set(option.text, Number(option.getAttribute("value")));
            });
        });
        return result;
    });
}, "ids", 5529600000);

export default buildHandler(getIDs, false);