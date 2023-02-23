export const isInRequiredRange = (
	defaultValue: string,
	targetValue: string
): boolean => {
	const mathConditionHeigher =
		+targetValue > +defaultValue + +defaultValue * 0.1;
	const mathConditionLower =
		+targetValue < +defaultValue - +defaultValue * 0.1;

	if (mathConditionHeigher || mathConditionLower) {
		return true;
	} else {
		return false;
	}
};
