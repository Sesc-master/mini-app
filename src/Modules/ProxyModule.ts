export default async function request (url: string | URL) {
    if (url instanceof URL) {
        url = url.toString();
    }

    return fetch('/api/proxy', {
        method: 'POST',
        body: JSON.stringify({url}),
    })
}