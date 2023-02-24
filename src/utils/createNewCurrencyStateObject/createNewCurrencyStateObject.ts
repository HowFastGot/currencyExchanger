export function createNewCurrencyStateObject(
	currency: 'usd' | 'euro' | 'btc',
	value: string
) {
	return {
		currency,
		value,
	};
}
