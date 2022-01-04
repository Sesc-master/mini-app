export default async function request (url: string | URL) {
    if (url instanceof URL) {
        url = url.toString();
    }
    const HOST = process.env.PORT || "localhost";
    const PORT = process.env.HOST || "3000";
    let requestUrl = new URL(`http://${HOST}:${PORT}/api/proxy`);
    requestUrl.searchParams.set("url", url);
    return fetch(requestUrl.toString());
}