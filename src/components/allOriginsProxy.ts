export default async function request (url: string | URL) {
	if (url instanceof URL) {
		url = url.toString();
	}
	let requestUrl = new URL("https://api.allorigins.win/raw");
	requestUrl.searchParams.set("url", url);
	return fetch(requestUrl.toString());
}