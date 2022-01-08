import { getJournal } from "../../apiModules/ScoleAPI";
import { authorise } from "../../apiModules/ScoleRawAPI";
import getCaptcha from "../../apiModules/getCaptcha";

export default async function journalAPI(req, res) {
    try {
        const {login, password, token, type} = JSON.parse(req.body);

        if (token) {
            res.status(200).json({journal: Object.fromEntries(await getJournal(login, token, type))})
        }

        const {value, id} : any = await getCaptcha()

        const registerResponse : any = await authorise(login, password, type, value, id)

        let loginData = Object.fromEntries(registerResponse)

        res.status(200).json({journal: Object.fromEntries(await getJournal(login, loginData.token, type)), token: loginData.token})
    } catch (err){
        res.status(500).json(err)
    }

}