import BaseLesson from "./BaseLesson";

export class SсheduleLesson extends BaseLesson {
    uid: number;
    auditory: string;
    subgroup: number;
    number: number;
    weekday: number;
    date?: string;
}