export function emulateServerError() {
	const countOfRequestApiCall: string = localStorage.getItem('count') ?? '0';
	let parsedCounterNumber = parseInt(countOfRequestApiCall);

	if (parsedCounterNumber >= 6) {
		localStorage.clear();
		throw new Error(
			'Too many API request, please try in 10 minutes... just kidding, reload the page!'
		);
	} else {
		localStorage.setItem('count', (++parsedCounterNumber).toString());
	}
}
