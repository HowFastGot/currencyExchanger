export const multiply = (num1: string, num2: string): string => {
	const result = +num1 * +num2;
	return result.toFixed(6);
};

export const divide = (num1: string, num2: string): string => {
	const result = +num1 / +num2;
	return result.toFixed(7);
};
