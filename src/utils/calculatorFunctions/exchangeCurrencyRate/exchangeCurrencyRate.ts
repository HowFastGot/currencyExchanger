import { CalculatorSetActionType } from '../../../types/slicesInitialStateInterface';
import { validateUserCalculatorInput } from '../';

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
