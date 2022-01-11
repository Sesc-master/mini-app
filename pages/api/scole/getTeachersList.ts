import scoleRequest, { IBaseRequestArgs } from "../../../src/APIModules/ScoleRequest";
import buildHandler from "../../../src/APIModules/BuildHandler";

export type Teacher = {
    login: string;
    fio: string
}

export async function getTeachersList(args: IBaseRequestArgs): Promise<Array<Teacher> | "none"> {
    return scoleRequest("teachList", args)
        .then(response => {
            if (response === "none") return response;
            else return JSON.parse(response);
        });
}

export default buildHandler(getTeachersList);