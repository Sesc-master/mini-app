import { SсheduleLesson } from "./ScheduleLesson";


export type IdableScheduleType = "group" | "teacher" | "auditory";
export type ScheduleType = IdableScheduleType | "all";

export class Schedule {
    type: ScheduleType;
    lessons: Array<SсheduleLesson>;
    diffs: Array<SсheduleLesson>;
}