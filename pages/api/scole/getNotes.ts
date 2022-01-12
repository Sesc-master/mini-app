import scoleRequest, { IBaseRequestArgs } from "../../../src/APIModules/ScoleRequest"
import dateConvert from "../../../src/APIModules/DateConvert"
import dateComparator from "../../../src/APIModules/DateComparator"
import buildHandler from "../../../src/APIModules/BuildHandler"

export interface IGetNotesArgs extends IBaseRequestArgs {
    pupil?: string,
}

type GoldinNote = {
    dt: string;
    r: string; rf: string;
    t: string;
    a: string; af: string;
    _id: string;
}

export type Note = {
    author: string, authorLogin: string;
    to: string, toID: string;
    text: string;
    date: string;
    id: string;
}

export async function getNotes(args: IGetNotesArgs): Promise<Array<Note> | "none"> {
    return scoleRequest("notesGet", args, [args.pupil || ""]).then(response => {
        if (response === "none") return response;
        else {
            let result = new Array<Note>();
            let notes: Array<GoldinNote> = JSON.parse(response);
            notes.forEach(note => {
                result.push({
                    author: note.af,
                    authorLogin: note.a,
                    to: note.rf,
                    toID: note.r,
                    text: note.t,
                    date: dateConvert(note.dt, false),
                    id: note._id
                });
            });
            result.sort((firstNote, secondNote) => dateComparator(firstNote.date, secondNote.date));
            return result;
        }
    });
}

export default buildHandler(getNotes);