import scoleRequest, { IBaseRequestArgs } from "../../../src/APIModules/ScoleRequest"
import buildHandler from "../../../src/APIModules/BuildHandler";
import reviver from "../../../src/APIModules/JSONReviver";
import { getSubjectsList } from "./getSubjectsList";

export interface IGetReportCardArgs extends IBaseRequestArgs {
    target: string
}

export async function getReportCard(args: IGetReportCardArgs) {
    return Promise.all([getSubjectsList(args), scoleRequest("tabelGet", args, [args.target])]).then(responses => {
        if (responses[0] === "none" || responses[1] === "none") return "none";
        let subjects = responses[0];
        let reportCard: Map<string, Map<string, string>> = JSON.parse(responses[1], reviver([]));
        let result = new Map<string, Map<string, string>>();
        reportCard.forEach((grades, subjectId) => {
            result.set(subjects.get(subjectId), grades);
        });
        return result;
    })
}

export default buildHandler(getReportCard);