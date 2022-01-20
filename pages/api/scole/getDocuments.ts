import scoleRequest, { IBaseRequestArgs } from "../../../src/APIModules/ScoleRequest"
import reviver from "../../../src/APIModules/JSONReviver";
import buildHandler from "../../../src/APIModules/BuildHandler";

export interface IGetDocumentsArgs extends IBaseRequestArgs {
    target: "pupil" | string
}

type GoldinDocument = {
    Uclass: string;
    pupil: string;
    vid: "med" | "mp" | "par" | "out" | "adm" | "tut" | "etc",
    start: string;
    fin: string;
    prim: string;
    _id: string
}

export type Document = {
    class: string;
    pupil: string;
    type: "med" | "mp" | "par" | "out" | "adm" | "tut" | "etc";
    dateStart: string;
    dateEnd: string;
    prim: string;
    id: string;
}

export async function getDocuments(args: IGetDocumentsArgs): Promise<Array<Document> | "none"> {
    return scoleRequest("sprGet", args, [args.target])
        .then(response => {
            console.log(response)
            if (response === "none") return response;
            else {
                let apiResponse: Array<GoldinDocument> = JSON.parse(response, reviver([[
                    "Uclass", "pupil", "vid", "start", "fin", "prim", "_id"
                ]]));
                return apiResponse.map(document => {
                    return {
                        class: document.Uclass,
                        pupil: document.pupil,
                        type: document.vid,
                        dateStart: document.start,
                        dateEnd: document.fin,
                        prim: document.prim,
                        id: document._id
                    }
                })
            }
        });
}

const handler = buildHandler(getDocuments);
export default handler;