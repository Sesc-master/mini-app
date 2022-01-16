import BaseLesson from "./BaseLesson";



export class FullSсhedule {
    public static ignoringAuditories: Array<string> = ["Общежитие", "Библиотека", "Нет"];

    public auditories: Map<string, Array<BaseLesson | boolean>>;

    protected isFreeAuditory(auditory: string, lessonNumber: number): Boolean {
        let auditorySchedule = this.auditories.get(auditory);
        if (auditorySchedule !== undefined)
            return auditorySchedule[lessonNumber] === false;
        else return false;
    }
    protected getFreeAuditoriesOnLesson(lessonNumber: number): Array<string> {
        let freeAuditories: Array<string> = [];
        this.auditories.forEach((lessons, auditory) => {
            if (lessons[lessonNumber] === false && !FullSсhedule.ignoringAuditories.includes(auditory))
                freeAuditories.push(auditory);
        });
        return freeAuditories;
    } 
    public getFreeAuditories(): Array<Array<string>> {
        let maxLessons: number = this.auditories.values().next().value.length;
        let result = new Array<Array<string>>(maxLessons);
        for (let lesson = 0; lesson < maxLessons; lesson++) {
            result[lesson] = this.getFreeAuditoriesOnLesson(lesson);
        }
        return result;
    }
}