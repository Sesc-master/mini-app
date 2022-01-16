import request from "./ProxyModule";

const server: string = "lyceum.urfu.ru";
const page: string = "ucheba/raspisanie-zanjatii"

const ignoringText = [
    "Нет", "Учитель", "Выберите класс", "Выберите аудиторию", "Выберите преподавателя", "Выберите день"
];

export type ParsedIDs = {
    groups: Map<string, number>;
    teachers: Map<string, number>;
    auditories: Map<string, number>;
    weekdays: Map<string, number>;
}

export default async function getIDs(): Promise<ParsedIDs> {
    let groups = new Map<string, number>();
    let teachers = new Map<string, number>();
    let auditories = new Map<string, number>();
    let weekdays = new Map<string, number>();

    return new Promise((resolve, reject) => {
        let pageURL = new URL(`https://${server}/${page}`);
        return request(pageURL)
            .then(response => {
                return response.text();
            })
            .then(stringHTMLPage => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(stringHTMLPage, "text/html");
                let formElement = doc.querySelector("form");
                if (!formElement) reject();

                let selectors = formElement?.querySelectorAll("select");
                if (selectors === undefined) reject();

                selectors?.forEach(selectElement => {
                    let selectType: Map<string, number> | undefined;
                    switch (selectElement.getAttribute("data-name")) {
                        case "group":
                            selectType = groups;
                            break;
                        case "auditory":
                            selectType = auditories;
                            break;
                        case "teacher":
                            selectType = teachers;
                            break;
                        case "weekday":
                            selectType = weekdays;
                            break
                    }
                    for (let selectElementIndex = 0; selectElementIndex < selectElement.options.length &&
                        selectType !== undefined; selectElementIndex++) {
                        if (!ignoringText.includes(selectElement.options[selectElementIndex].text)) {
                            selectType.set(
                                selectElement.options[selectElementIndex].text,
                                Number(selectElement.options[selectElementIndex].value)
                            );
                        }
                    }
                });
                resolve({
                    groups, teachers, auditories, weekdays
                });
            });
    });
}

