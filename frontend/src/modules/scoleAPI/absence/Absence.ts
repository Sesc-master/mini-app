import {Absences} from "../types/Absences";
import {Documents} from "../types/Documents";
import {isBetweenDates} from "../date/isBetweenDates"
import {academicDates} from "../date/academicDates";
import {Absent} from "../types/Absent";

class Absence {
    absences : Absences | undefined;
    documents : Documents | undefined;

    constructor(absences: Absences, documents: Documents) {
        this.absences = absences;
        this.documents = documents;
    }

    private isSkip = (date: string) => {
        if (!this.documents || !this.documents.length){
            return false;
        }

        for (let i = 0; i < this.documents.length; i++) {
            const start = this.documents[i].dateStart;
            const end = this.documents[i].dateEnd;

            if (isBetweenDates([start, end], date)){
                return false;
            }
        }
        return true;
    }

    public getSummary = () => {
        if (!this.absences) return undefined;

        const summary: any = [];

        Object.values(academicDates).forEach(({dates, name}) => {
            let all = 0;
            let skiped = 0;
            Array.from(this.absences?.values() || []).forEach((absent: Absent[]) => {
                Object.values(absent).forEach(({date, abs}: Absent) => {
                    if (this.isSkip(date) && isBetweenDates(dates, date)) {
                        skiped += abs;
                    }
                    if (isBetweenDates(dates, date)){
                        all += abs;
                    }
                })
            })
            summary.push({name, all, skiped})
        })

        return summary;
    }
}

export default Absence;