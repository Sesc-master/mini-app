import getFullSchedule from "./api/getFullSchedule";

export async function getFreeAuditories(weekday: number) {
    const weekdayFullSchedule = await getFullSchedule(weekday);

    let weekdayFreeAuditories = Array.from(Array(7), () => new Array<string>());
    weekdayFullSchedule.forEach((lessons, auditory) => {
        lessons.forEach((lesson, lessonIndex) => {
            if (lesson === false) weekdayFreeAuditories[lessonIndex].push(auditory);
        })
    });

    return weekdayFreeAuditories;
}