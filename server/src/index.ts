import express from "express";
import path from "path";
import GetIDs from "./handlers/getIDs";
import {getFullSchedule} from "./handlers/getFullSchedule";
import {getSchedule} from "./handlers/getSchedule";
import createServerSsl from "./helpers/CreateServerSsl";
import NodeCache from "node-cache";
const cache = new NodeCache();

const PORT = process.env.PORT || 5000;
const app = express();

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
        const {id, weekday, type} = req.body;
        if (!id || !weekday || !type){
            res.status(400).send("invalid json")
        }

        const key = id.toString() + weekday.toString() + type.toString();
        cache.set(key, schedule);

        res.status(200).json(schedule);
    } catch(error : Error | any) {
        const {id, weekday, type} = req.body;
        const key = id.toString() + weekday.toString() + type.toString();

        if (!cache.has(key)) {
            res.status(500).send("Server Error");
        }

        res.status(200).send(cache.get(key));
    }
})

app.get("*", (req: any, res: any) => {
   res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
});

if (process.env.IsSSL === "true") {
    createServerSsl(app, Number(PORT));
}else{
    app.listen(PORT, () => console.log('Server started on port ' + PORT));
}