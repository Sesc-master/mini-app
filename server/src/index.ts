import express from "express";
import path from "path";
import GetIDs from "./handlers/getIDs";
import {getFullSchedule} from "./handlers/getFullSchedule";
import {getSchedule} from "./handlers/getSchedule";
import createServerSsl from "./helpers/CreateServerSsl";

const PORT = process.env.PORT || 443;
const app = express();

console.log(process.env.isProduction);

app.use(express.static(path.resolve(__dirname, "../../frontend/build")));
app.use(express.json());

app.get("/api/sesc/getIDs", GetIDs);

app.post("/api/sesc/getFullSchedule", async (req, res) => {
    try{
        const fullSchedule = await getFullSchedule(req.body);
        res.status(200).json(fullSchedule);
    }catch (err) {
        res.status(500).json(err);
    }
});

app.post("/api/sesc/getSchedule",  async (req, res) => {
    try {
        const schedule = await getSchedule(req.body);
        res.status(200).json(schedule);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get("*", (req: any, res: any) => {
   res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
});

if (process.env.isProducton === "true") {
    createServerSsl(app, Number(PORT));
}else{
    app.listen(PORT, () => console.log('Server started on port ' + PORT));
}