import { ScheduleLesson } from "./ScheduleLesson";


export type IdableScheduleType = "group" | "teacher" | "auditories";
export type ScheduleType = IdableScheduleType | "all";

export class Schedule {
    type: IdableScheduleType;
    lessons: Array<ScheduleLesson>;
    diffs: Array<ScheduleLesson>;
}