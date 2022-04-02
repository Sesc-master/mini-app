export const lessonTimes = [
    ["09:00", "09:40"],
    ["09:50", "10:30"],
    ["10:45", "11:25"],
    ["11:40", "12:20"],
    ["12:35", "13:15"],
    ["13:35", "14:15"],
    ["14:35", "15:15"]
];

type IEvent = {
    order: number | undefined,
    start: {hours: number, minutes: number} | undefined,
    end: {hours: number, minutes: number} | undefined,
    type: "урок" | "перемена" | undefined,
};

export class Event {
    getCurrentBreak = () : IEvent | undefined => {
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();

        let order;
        let start;
        let end;
        lessonTimes.forEach((times, index) => {
            const startLessonHours = Number(times[0].split(":")[0]);
            const startLessonMinutes = Number(times[0].split(":")[1]);
            const finalLessonHours = Number(times[1].split(":")[0]);
            const finalLessonMinutes = Number(times[1].split(":")[1]);

            if (hours === startLessonHours && minutes >= startLessonMinutes
                || hours === finalLessonHours && minutes <= finalLessonMinutes ){
                order = index;
                start = {
                    hours: startLessonHours,
                    minutes: startLessonMinutes
                };
                end = {
                    hours: finalLessonHours,
                    minutes: startLessonMinutes
                }
            }
        });

        return order ? {order, end, start, type: "урок"} : undefined;
    };

    getCurrentLesson = () : IEvent | undefined => {
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();

        let order;
        let end;
        let start;
        for (let i = 0; i < lessonTimes.length - 1; i++){
            const currentLessonEnd = {
                hours: Number(lessonTimes[i][1].split(":")[0]),
                minutes: Number(lessonTimes[i][1].split(":")[1])
            };
            const nextLessonStart = {
                hours: Number(lessonTimes[i + 1][0].split(":")[0]),
                minutes: Number(lessonTimes[i + 1][0].split(":")[1])
            };

            if (currentLessonEnd.hours === hours && minutes >= currentLessonEnd.minutes
                || nextLessonStart.hours === hours && minutes <= currentLessonEnd.minutes){
                order = i;
                start = {
                    hours: currentLessonEnd.hours,
                    minutes: currentLessonEnd.minutes
                };
                end = {
                    hours: nextLessonStart.hours,
                    minutes: nextLessonStart.minutes
                }
            }
        }

        return order ? {order, start, end, type: "перемена"} : undefined;
    };

    public getCurrentEvent = () : IEvent | undefined => {
        const $lesson = this.getCurrentLesson();
        const $break = this.getCurrentBreak();

        if ($lesson) {
            return $lesson;
        } else if ($break) {
            return $break;
        } else {
            return undefined;
        }
    };

    public getTimeToEnd(event: IEvent | undefined) {
        if (!event){
            return undefined;
        }
        const hours = new Date().getHours();
        const minutes = new Date().getMinutes();
        const seconds = new Date().getSeconds();

        if (event.end?.hours === event.start?.hours){
            return {
                minutes: seconds === 0 ? Number(event.end?.minutes) - minutes :
                    Number(event.end?.minutes) - minutes - 1,
                seconds: 60 - seconds};
        } else {

        }
    }
}
