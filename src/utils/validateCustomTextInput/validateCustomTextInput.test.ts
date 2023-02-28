import { isInRequiredRange } from './validateCustomTextInput';

describe('isInRequiredRange', () => {
	it('Should return true if targetValue is within +- 10% range of defaultValue', () => {
		expect(isInRequiredRange('10', '11')).toBe(true);
		expect(isInRequiredRange('20', '18')).toBe(true);
	});
	it('Should return false if targetValue is outside of +- 10% range of defaultValue', () => {
		expect(isInRequiredRange('30', '26')).toBe(false);
		expect(isInRequiredRange('40', '45')).toBe(false);
	});
});
