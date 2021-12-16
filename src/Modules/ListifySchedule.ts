import { sсheduleLesson, schedule } from "./Schedule";

const maxLessons = 7;

export class TimetableElement {
    firstGroupLesson: sсheduleLesson | undefined
    secondGroupLesson: sсheduleLesson | undefined
    commonLesson: sсheduleLesson | undefined
    isCommonLesson: Boolean | undefined
}

export function listifySchedule (schedule: schedule) : Array<TimetableElement>{
    let lessons = new Array<Array<sсheduleLesson>>(), changes = new Array<Array<sсheduleLesson>>();
    for (let scheduleSlot = 0; scheduleSlot < maxLessons; scheduleSlot++) {
        changes.push(new Array<sсheduleLesson>());
        lessons.push(new Array<sсheduleLesson>());
    }
    schedule.lessons.forEach(lesson => lessons[lesson.number - 1].push(lesson));
    schedule.diffs.forEach(lesson => changes[lesson.number - 1].push(lesson));

    let timetableItems = new Array<TimetableElement>()

    for (let i = 0; i <= 6; i++){
        timetableItems.push(new TimetableElement())
    }

    schedule.lessons.forEach((element) => {
        if (element === undefined) return;

        if (element.subgroup === 0){
            timetableItems[element.number - 1].isCommonLesson = true
            timetableItems[element.number - 1].commonLesson = element
        }else if(element.subgroup === 1){
            timetableItems[element.number - 1].isCommonLesson = false
            timetableItems[element.number - 1].firstGroupLesson = element
        }else {
            timetableItems[element.number - 1].isCommonLesson = false
            timetableItems[element.number - 1].secondGroupLesson = element
        }
    })

    schedule.diffs.forEach((element) => {
        if (element === undefined) return;

        if (element.subgroup === 0){
            timetableItems[element.number - 1].isCommonLesson = true
            timetableItems[element.number - 1].commonLesson = element
        }else if(element.subgroup === 1){
            timetableItems[element.number - 1].isCommonLesson = false
            timetableItems[element.number - 1].firstGroupLesson = element
        }else {
            timetableItems[element.number - 1].isCommonLesson = false
            timetableItems[element.number - 1].secondGroupLesson = element
        }
    })

    return timetableItems
};
