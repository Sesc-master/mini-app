import express from "express";
import path from "path";
import createServerSsl from "./utils/CreateServerSsl";
import {graphqlHTTP} from "express-graphql";
import {buildSchemaSync} from "type-graphql";
import TimingsResolver from "./api/timingsResolver";
import IDsResolver from "./api/IDsResolver";
import ScheduleResolver from "./api/scheduleResolver";
import {setCache} from "./sesc/sescCache/setCache";
import {keysTimeout} from "./sesc/sescCache/keysTimeout";
import {updateCache} from "./sesc/sescCache/updateCache";

setCache();
setInterval(updateCache, keysTimeout.defaultTimeoutMs)

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static(path.resolve(__dirname, "../../frontend/build")));
app.use(express.json());

app.use("/graphql", graphqlHTTP({
    schema: buildSchemaSync({
        resolvers: [TimingsResolver, IDsResolver, ScheduleResolver]
    })
}));

app.get("*", (req: any, res: any) => {
    res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
});

if (process.env.IsSSL === "true") {
    createServerSsl(app, Number(PORT));
}
else {
    app.listen(PORT, () => console.log("Server started on port " + PORT));
}