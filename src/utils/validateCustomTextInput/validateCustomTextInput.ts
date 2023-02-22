export const isInRequiredRange = (
	defaultValue: number,
	targetValue: number
): boolean => {
	const mathConditionHeigher =
		targetValue > defaultValue + defaultValue * 0.1;
	const mathConditionLower = targetValue < defaultValue - defaultValue * 0.1;

	console.log(mathConditionHeigher, mathConditionLower);

	if (mathConditionHeigher || mathConditionLower) {
		return true;
	} else {
		return false;
	}
};
