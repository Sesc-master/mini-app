import scoleRequest, { IBaseRequestArgs } from "../../../src/APIModules/ScoleRequest"
import buildHandler from "../../../src/APIModules/BuildHandler";
import { getSubjectsList } from "./getSubjectsList";
import dateConvert from "../../../src/APIModules/DateConvert";

export interface IGetAbsencesArgs extends IBaseRequestArgs {
    pupil?: string,
    class?: string
}

type GoldinAbsent = {
    d: string,
    s: string,
    p: string,
    abs: number
}

export type Absent = {
    date: string,
    subject: string,
    pupil: string,
    abs: number
}

export async function getAbsences(args: IGetAbsencesArgs): Promise<Map<string, Array<Absent>> | "none"> {
    return Promise.all([getSubjectsList(args), scoleRequest("absentGet", args, [args.class || "", args.pupil || ""])])
        .then(responses => {
            let subjects = responses[0];
            if (subjects === "none" || responses[1] === "none") return "none";
            else {
                let absences: Array<GoldinAbsent> = JSON.parse(responses[1]);
                let result = new Map<string, Array<Absent>>();
                absences.forEach(absent => {
                    let subject = subjects.get(absent.s)
                    let absentObject: Absent = {
                        date: dateConvert(absent.d, false),
                        subject: subject,
                        pupil: absent.p,
                        abs: absent.abs
                    }
                    if (result.has(subject)) result.get(subject)?.push(absentObject);
                    else result.set(subject, [absentObject]);
                })
                return result;
            }
        });
}

export default buildHandler(getAbsences);