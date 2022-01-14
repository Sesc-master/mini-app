import scoleRequest, { IBaseRequestArgs } from "../../../src/APIModules/ScoleRequest"
import buildHandler from "../../../src/APIModules/BuildHandler";
import reviver from "../../../src/APIModules/JSONReviver";
import { getSubjectsList } from "./getSubjectsList";

export interface IGetReportCardArgs extends IBaseRequestArgs {
    target: string
}

export type ReportCard = Map<string, Array<string | undefined>>;

export async function getReportCard(args: IGetReportCardArgs): Promise<ReportCard | "none"> {
    return Promise.all([getSubjectsList(args), scoleRequest("tabelGet", args, [args.target])]).then(responses => {
        if (responses[0] === "none" || responses[1] === "none") return "none";
        else {
            let subjects = responses[0];
            let reportCard: Map<string, Map<string, string>> = JSON.parse(responses[1], reviver([]));
            let result = new Map<string, Array<string | undefined>>();
            reportCard.forEach((grades, subjectId) => {
                let subjectName = subjects.get(subjectId);
                if (subjectName) {
                    result.set(subjectName, new Array<string | undefined>(7));
                    grades.forEach((grade, date) => {
                        //TS can't understand what now subjectName is only string and what result[subjectName] exist
                        (result.get(subjectName as string) as Array<string | undefined>)[date.charCodeAt(date.length - 1) - "a".charCodeAt(0)] = grade;
                    });
                }
            });
            return result;
        }
    })
}

export default buildHandler(getReportCard);