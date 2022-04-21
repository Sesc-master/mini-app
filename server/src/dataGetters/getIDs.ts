import { parse } from "node-html-parser";
import SESCRequest from "../helpers/SESCRequest";
import { IdableScheduleType } from "./getSchedule";

const timeout = 8000;

const ignoringText = [
    "Нет", "Учитель", "Выберите класс", "Выберите аудиторию", "Выберите преподавателя", "Выберите день"
];

export type ParsedIDs = Record<IdableScheduleType | "weekday", Map<string, number>>;

export default async function getIDs () {
    return SESCRequest({
        timeout: timeout,
        host: "lyceum.urfu.ru",
        path: "/ucheba/raspisanie-zanjatii"
    }).then(lyceumResponse => {
        let result: ParsedIDs = {
            group: new Map<string, number>(),
            teacher: new Map<string, number>(),
            auditory: new Map<string, number>(),
            weekday: new Map<string, number>()
        }

        let formElement = parse(lyceumResponse.body).getElementsByTagName("form")[0];
        if (!formElement) return;

        let selectElements = formElement.getElementsByTagName("select");
        selectElements.forEach(selectElement => {
            let selectType: Map<string, number>;

            let selectorType = selectElement.getAttribute("data-name");
            if (selectorType === "group" || selectorType === "teacher" || selectorType === "auditory" || selectorType === "weekday") {
                selectType = result[selectorType];
            }
            else return;

            let options = selectElement.getElementsByTagName("option");
            options.forEach(option => {
                if (!ignoringText.includes(option.text)) selectType.set(option.text, Number(option.getAttribute("value")));
            });
        });
        return result;
    });
}