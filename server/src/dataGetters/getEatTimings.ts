import { parse, HTMLElement } from "node-html-parser";
import SESCRequest from "../helpers/SESCRequest";
import EatTimings from "../api/types/eatTimings";
import EatTiming from "../api/types/eatTiming";
import Timing from "../api/types/timing";

const timeout = 8000;

export const lessonsTimings: Array<Timing> = [
    {startTime: "9:00",  endTime: "9:40"},
    {startTime: "9:50",  endTime: "10:30"},
    {startTime: "10:45", endTime: "11:25"},
    {startTime: "11:40", endTime: "12:20"},
    {startTime: "12:35", endTime: "13:15"},
    {startTime: "13:35", endTime: "14:15"},
    {startTime: "14:35", endTime: "15:15"}
];


export type ClassesEatTimings = Map<string, EatTimings>;

export function getEats(table: HTMLElement, timings: Array<Timing>): ClassesEatTimings {
    let result = new Map<string, any>();
    let type = "";
    let timing: EatTiming;
    table?.getElementsByTagName("tr").forEach(row => {
        row.getElementsByTagName("td").forEach((cell, index) => {
            if (cell.getAttribute("class") == "clspn") type = cell.text.toLowerCase();
            else if (index == 0) {

                let times = Array.from(cell.text.match(/\d{1,2}:\d{2}/g) || ["9:00"]);
                timing = {startTime: times[0], endTime: "", afterLesson: 0};
                let lessonBefore = timings.find(lessonTiming => lessonTiming.endTime == timing.startTime);

                if (lessonBefore) {
                    timing.afterLesson = timings.indexOf(lessonBefore);
                }

                if (times.length < 2) {
                    timing.endTime = timings[timing.afterLesson + 1].startTime;
                }
                else timing.endTime = times[1];
            }
            else {
                let classes = new Array<string>();
                cell.text.toUpperCase().split(/[,\s]/).filter(multiClass => multiClass.length > 0).forEach(multiClass => {
                    let classNumberMatches = multiClass.match(/\d+/);
                    if (classNumberMatches) {
                        let classNumber = classNumberMatches[0];
                        let classesLetters = multiClass.slice(classNumber.length).split('');
                        classes = classes.concat(classesLetters.map(classLetter => classNumber + classLetter));
                    }
                    else {
                        classes = Array.from(result.keys());
                    }
                });

                classes.forEach(className => {
                    let classEatTimings;
                    if(!result.has(className)) {
                        classEatTimings = {breakfast: "", afternoonSnack: "", dinner: ""};
                    }
                    else {
                        classEatTimings = result.get(className);
                    }
                    switch (type) {
                        case "завтрак": classEatTimings.breakfast = timing; break;
                        case "обед":    classEatTimings.dinner = timing; break;
                        case "полдник": classEatTimings.afternoonSnack = timing; break;
                    }
                    result.set(className, classEatTimings);
                })
            }
        });
    });
    return result;
}


export default async function getEatTimings(): Promise<ClassesEatTimings | undefined> {
    return SESCRequest({
        timeout: timeout,
        host: "lyceum.urfu.ru",
        path: "/ucheba/raspisanie-zvonkov"
    }).then(lyceumResponse => {
        let eatTable = parse(lyceumResponse.body).getElementsByTagName("table").filter(element => element.getAttribute("class") == "eat")[0];

        if (eatTable) {
            return getEats(eatTable, lessonsTimings);
        }
        else return undefined;
    });
}