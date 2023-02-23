import { CalculatorSetActionType } from '../../types';

// UAH - basic currency
export const multiply = (num1: string, num2: string): string => {
	const result = +num1 * +num2;
	return result.toFixed(6);
};

export const divide = (num1: string, num2: string): string => {
	const result = +num1 / +num2;
	return result.toFixed(7);
};

//==================================================================================
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

export const exchangeCurrencyRate = (
	usersInsertedValue: string,
	currencyApiValue: string,
	operation: (num1: string, num2: string) => string,
	setChangeInputContent: CalculatorSetActionType,
	setGetInputContent: CalculatorSetActionType
): void => {
	const validatedString = validateUserCalculatorInput(
		usersInsertedValue,
		setChangeInputContent
	);

	if (validatedString.length < 1) {
		setGetInputContent('');
		return;
	}

	const rate = operation(validatedString, currencyApiValue);
	setGetInputContent(rate);
};

const calculateChangeInputToGetInput = () => {};
