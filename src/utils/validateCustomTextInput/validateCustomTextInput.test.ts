import { isInRequiredRange } from './validateCustomTextInput';

test('Control change currency range. Should be in 10%', () => {
	expect(isInRequiredRange('20', '23')).toBe(true);
});
