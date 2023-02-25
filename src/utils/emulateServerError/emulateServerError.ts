export function emulateServerError() {
	const countOfRequestApiCall: string = localStorage.getItem('count') ?? '0';
	let parsedCounterNumber = parseInt(countOfRequestApiCall);

	console.log(parsedCounterNumber, 'parsedCounterNumber');

	if (parsedCounterNumber >= 5) {
		localStorage.clear();
		throw new Error(
			'Too many API request, please try in 10 minutes... just kidding, reload the page!'
		);
	}
}
