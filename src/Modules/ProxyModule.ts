export default async function request (url: string | URL) {
    if (url instanceof URL) {
        url = url.toString();
    }
    const HOST = process.env.HOST || "localhost";
    const PORT = process.env.PORT || "3000";
    let requestUrl = new URL(`http://${HOST}:${PORT}/api/proxy`);
    requestUrl.searchParams.set("url", url);
    return fetch('/api/proxy', {
        method: 'POST',
        body: JSON.stringify({url}),
    })
}