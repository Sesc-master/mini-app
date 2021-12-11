import { sсheduleLesson, schedule } from "./Schedule";

const maxLessons = 7;
const lessonCanceledName = "Нет";

export default function listifySchedule (schedule: schedule) {
    let lessons = new Array<Array<sсheduleLesson>>(), changes = new Array<Array<sсheduleLesson>>();
    for (let scheduleSlot = 0; scheduleSlot < maxLessons; scheduleSlot++) {
        changes.push(new Array<sсheduleLesson>());
        lessons.push(new Array<sсheduleLesson>());
    }
    schedule.lessons.forEach(lesson => lessons[lesson.number - 1].push(lesson));
    schedule.diffs.forEach(lesson => changes[lesson.number - 1].push(lesson));

    for (let lessonNumber = 0; lessonNumber < maxLessons; lessonNumber++) {
        if (changes[lessonNumber].length != 0) {
            lessons[lessonNumber] = changes[lessonNumber];
        }
        lessons[lessonNumber] = lessons[lessonNumber].filter(lesson => lesson.subject != lessonCanceledName);
    }
    
    return lessons;
};