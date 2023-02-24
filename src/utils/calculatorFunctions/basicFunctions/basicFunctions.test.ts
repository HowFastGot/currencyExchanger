import { multiply, divide } from './basicFunctions';

describe('Сalculate currency', () => {
	test('Rigth expression multiply', () => {
		expect(multiply('12', '15')).toBe('180.000000');
	});

	test('Incorrect expression', () => {
		expect(multiply('2', '15')).not.toBe('120');
	});

	test('Rigth expression divide', () => {
		expect(divide('30', '2')).toBe('15.0000000');
	});

	test('Incorrect expression divide', () => {
		expect(divide('30', '2')).not.toBe('15');
	});
});
