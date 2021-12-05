import request from "./AllOriginsProxy";

export default class ids {
	static server: string = "lyceum.urfu.ru";
    static page: string = "ucheba/raspisanie-zanjatii"

    static groups: Map<string, number>;
    static teachers: Map<string, number>;
    static auditories: Map<string, number>;
    static weekdays: Map<string, number>;

    static ignoringText = ["Нет", "Учитель", "Выберите класс", "Выберите аудиторию", "Выберите преподавателя", "Выберите день"];

    static async refresh() {
        this.groups = new Map<string, number>();
        this.teachers = new Map<string, number>();
        this.auditories = new Map<string, number>();
        this.weekdays = new Map<string, number>();
        
        return new Promise((resolve, reject) => {
            let pageURL = new URL(`https://${this.server}/${this.page}`);
            return request(pageURL)
            .then(response => {
                return response.text();
            })
            .then(stringHTMLPage => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(stringHTMLPage, 'text/html');
                let formElement = doc.querySelector("form");
                if (!formElement) reject();

                let selectors = formElement?.querySelectorAll("select");
                if (selectors === undefined) reject();

                selectors?.forEach(selectElement => {
                    let selectType: Map<string, number> | undefined;
                    switch(selectElement.getAttribute("data-name")) {
                        case "group":
                            selectType = this.groups;
                            break;
                        case "auditory":
                            selectType = this.auditories;
                            break;
                        case "teacher":
                            selectType = this.teachers;
                            break;
                        case "weekday":
                            selectType = this.weekdays;
                            break
                    }
                    for (let selectElementIndex = 0; selectElementIndex < selectElement.options.length &&
                        selectType !== undefined; selectElementIndex++) {
                        if (!this.ignoringText.includes(selectElement.options[selectElementIndex].text))
                            selectType.set(selectElement.options[selectElementIndex].text, Number(selectElement.options[selectElementIndex].value));
                    }
                });
                resolve(this);
            });
        });
    }
}
