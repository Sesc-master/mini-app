import { Schedule } from "./Schedule/Schedule";
import { SсheduleLesson } from "./Schedule/ScheduleLesson";

const maxLessons = 7;

export class TimetableElement {
    firstGroupLesson: SсheduleLesson | undefined
    secondGroupLesson: SсheduleLesson | undefined
    commonLesson: SсheduleLesson | undefined
    isCommonLesson: Boolean | undefined
}

export function listifySchedule (schedule: Schedule) : Array<TimetableElement>{
    let lessons = new Array<Array<SсheduleLesson>>(), changes = new Array<Array<SсheduleLesson>>();
    for (let scheduleSlot = 0; scheduleSlot < maxLessons; scheduleSlot++) {
        changes.push(new Array<SсheduleLesson>());
        lessons.push(new Array<SсheduleLesson>());
    }
    schedule.lessons.forEach(lesson => lessons[lesson.number - 1].push(lesson));
    schedule.diffs.forEach(lesson => changes[lesson.number - 1].push(lesson));

    let timetableItems = new Array<TimetableElement>()

    for (let i = 0; i <= 6; i++){
        timetableItems.push(new TimetableElement())
    }

    schedule.lessons.forEach((element) => {
        if (element === undefined) return;

        if (element.subgroup === 0) {
            timetableItems[element.number - 1].isCommonLesson = true
            timetableItems[element.number - 1].commonLesson = element
        }
        else if(element.subgroup === 1) {
            timetableItems[element.number - 1].isCommonLesson = false
            timetableItems[element.number - 1].firstGroupLesson = element
        }
        else {
            timetableItems[element.number - 1].isCommonLesson = false
            timetableItems[element.number - 1].secondGroupLesson = element
        }
    })

    schedule.diffs.forEach((element) => {
        if (element === undefined) return;

        if (element.subgroup === 0) {
            timetableItems[element.number - 1].isCommonLesson = true
            timetableItems[element.number - 1].commonLesson = element
        }
        else if(element.subgroup === 1) {
            timetableItems[element.number - 1].isCommonLesson = false
            timetableItems[element.number - 1].firstGroupLesson = element
        }
        else {
            timetableItems[element.number - 1].isCommonLesson = false
            timetableItems[element.number - 1].secondGroupLesson = element
        }
    })

    return timetableItems
};
