import { getJournal } from "../../apiModules/ScoleAPI";
import { register } from "../../apiModules/ScoleRawAPI";
import getCaptcha from "../../apiModules/getCaptcha";

export default async function journalAPI(req, res) {
    try {
        const {login, password, token, type} = JSON.parse(req.body);

        if (token) {
            res.status(200).json({journal: Object.fromEntries(await getJournal(login, token, type))})
        }

        const {value, id} : any = await getCaptcha()

        const registerResponse : any = await register(login, password, type, value, id)

        let loginData = Object.fromEntries(registerResponse)

        // TODO: get only if parent or pupil 
        res.status(200).json({journal: Object.fromEntries(await getJournal(login, loginData.token, loginData.roles[0])), token: loginData.token})
    } catch (err){
        res.status(500).json(err)
    }

}