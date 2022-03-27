import BaseLesson from "./BaseLesson";

export class ScheduleLesson extends BaseLesson {
    uid: number;
    auditory: string;
    subgroup: number;
    number: number;
    weekday: number;
    date?: string;
}