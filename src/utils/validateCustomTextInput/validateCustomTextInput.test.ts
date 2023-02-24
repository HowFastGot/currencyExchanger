import { isInRequiredRange } from './validateCustomTextInput';

describe('Validate table cell input', () => {
	test('Control change currency range. Invalid range', () => {
		expect(isInRequiredRange('20', '23')).toBe(true);
	});

	test('Control change currency range. Valid range', () => {
		expect(isInRequiredRange('11', '10')).toBe(false);
	});
});
