import scoleRequest, { IBaseRequestArgs } from "../../../src/APIModules/ScoleRequest";
import buildHandler from "../../../src/APIModules/BuildHandler";
import buildCachedFunction from "../../../src/APIModules/Cache";

export type Teacher = {
    login: string;
    fio: string
}

export const getTeachersList = buildCachedFunction(async function (args: IBaseRequestArgs): Promise<Array<Teacher> | "none"> {
    return scoleRequest("teachList", args)
        .then(response => {
            if (response === "none") return response;
            else return JSON.parse(response);
        });
}, "teachers");

export default buildHandler(getTeachersList);