export function emulateServerError() {
	const countOfRequestApiCall: string = localStorage.getItem('count') ?? '0';
	let parsedCounterNumber = parseInt(countOfRequestApiCall);

	if (parsedCounterNumber >= 5) {
		localStorage.clear();

		return 'Too many API request, please try in 10 minutes... just kidding, reload the page!';
	} else {
		return null;
	}
}
