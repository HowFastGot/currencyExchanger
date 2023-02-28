import { multiply, divide } from './basicFunctions';

describe('Сalculate currency', () => {
	test('Multiply 1.2 by 3.4 should equal 4.08', () => {
		expect(multiply('1.2', '3.4')).toBe('4.080000');
	});

	test('Multiply -9.34 by -0.5 should equal 4.67', () => {
		expect(multiply('-9.34', '-0.5')).toBe('4.670000');
	});

	test('Multiply 0.1 by 2 should equal 0.2', () => {
		expect(multiply('0.1', '2')).toBe('0.200000');
	});

	test('divide function output is a string', () => {
		const result = divide('3', '2');
		expect(typeof result).toBe('string');
	});

	test('Rigth expression divide', () => {
		expect(divide('30', '2')).toBe('15.0000000');
	});

	test('Incorrect expression divide', () => {
		expect(divide('30', '2')).not.toBe('15');
	});
});
