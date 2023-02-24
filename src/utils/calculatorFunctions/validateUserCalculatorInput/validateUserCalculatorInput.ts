export const validateUserCalculatorInput = (
	userInputString: string,
	setInputContent: React.Dispatch<React.SetStateAction<string>>
): string => {
	const regExp = /^[0-9]+(.)?([0-9]+)?/gi;
	const foundMatchesArr = userInputString.match(regExp);

	if (foundMatchesArr) {
		const filteredValue: string = foundMatchesArr.toString();

		if (isNaN(+filteredValue)) return filteredValue.slice(0, -1);

		setInputContent(filteredValue);
		return filteredValue;
	} else {
		if (userInputString === '') {
			setInputContent('');
		}
		return '';
	}
};
