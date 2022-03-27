import fs from "fs";
import https from "https";
import path from "path";

const createServerSsl = (app: any, port: number) => {
    const sslOptions = {
        key: fs.readFileSync(path.resolve(__dirname, "../../ssl/privateKey.pem")),
        cert: fs.readFileSync(path.resolve(__dirname, "../../ssl/certificate.pem"))
    };

    const server = https.createServer(sslOptions, app)
    server.on("error", (error) => {
        console.error(error)
    })
    server.listen(port);
}

export default createServerSsl;