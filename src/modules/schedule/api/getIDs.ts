import request from "../../capacitorRequest/request";
import {IdableScheduleType} from "../types/Schedule";

const ignoringText = [
    "Нет", "Учитель", "Выберите класс", "Выберите аудиторию", "Выберите преподавателя", "Выберите день"
];

export type ParsedIDs = Record<any | "weekdays", Map<string, number>>;

export default async function getIDs () {
    return request({
        method: 'GET',
        url: "https://lyceum.urfu.ru/ucheba/raspisanie-zanjatii",
    }).then(({ data }) => {
        let result: ParsedIDs = {
            groups: new Map<string, number>(),
            teachers: new Map<string, number>(),
            auditories: new Map<string, number>(),
            weekdays: new Map<string, number>()
        }

        console.log(data);
        let formElement = new DOMParser().parseFromString(data, "text/html").getElementsByTagName("form")[0];
        if (!formElement) return;
        console.log(formElement);

        let selectElements = formElement.getElementsByTagName("select");
        Array.from(selectElements).forEach((selectElement) => {
            let selectType: Map<string, number>;

            let selectorType = selectElement.getAttribute("data-name");
            console.log(selectorType)
            switch (selectorType) {
                case "group": selectType = result.groups; break;
                case "teacher": selectType = result.teachers; break;
                case "auditory": selectType = result.auditories; break;
                case "weekday": selectType = result.weekdays; break;
                default: return;
            }

            let options = selectElement.getElementsByTagName("option");
            console.log(options)
            Array.from(options).forEach((option) => {
                console.log(option.innerHTML)
                if (!ignoringText.includes(option.innerHTML)) selectType.set(option.innerHTML, Number(option.getAttribute("value")));
            });
        });

        return result;
    });
}