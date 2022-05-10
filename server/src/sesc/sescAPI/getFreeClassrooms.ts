import BaseLesson from "../../api/types/baseSchedule";

export function getFreeClassrooms(classrooms: Map<string, Array<BaseLesson | false>>) {
    let weekdayFreeClassrooms = Array.from(Array(7), () => new Array<string>());
    classrooms.forEach((lessons, auditory) => {
        lessons.forEach((lesson, lessonIndex) => {
            if (lesson === false) weekdayFreeClassrooms[lessonIndex].push(auditory);
        })
    });

    return weekdayFreeClassrooms
}
