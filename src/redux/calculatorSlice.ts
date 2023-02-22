import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
	uan: {
		buy: 1,
		sell: 1,
	},
	usd: {
		buy: 0,
		sell: 0,
	},
	euro: {
		buy: 0,
		sell: 0,
	},
	btc: {
		buy: 0,
		sell: 0,
	},
	changeCurrency: 'UAH',
	getCurrency: 'USD',
};

const calculatorSlice = createSlice({
	name: 'calculatorSlice',
	initialState,
	reducers: {
		fetchInitialValuesExceptBtc: (
			state,
			action: {
				payload: {
					usd: {
						buy: number;
						sell: number;
					};
					euro: {
						buy: number;
						sell: number;
					};
				};
			}
		) => {
			const fetchedCurrencyObjects = {
				...action.payload,
			};

			type keyType = 'usd' | 'euro';
			let key: keyType;

			for (key in fetchedCurrencyObjects) {
				if (!fetchedCurrencyObjects.hasOwnProperty(key)) continue;

				state[key] = action.payload[key];
			}
		},
		fetchBtcInitialRate: (state, action) => {
			state.btc = action.payload;
		},
		changeCurrencyName: (state, action) => {
			state.changeCurrency = action.payload;
		},
		getCurrencyName: (state, action) => {
			state.getCurrency = action.payload;
		},
	},
});

export const calculatorSelector = createSelector(
	[
		(state: typeof initialState) => state.euro,
		(state: typeof initialState) => state.usd,
		(state: typeof initialState) => state.uan,
		(state: typeof initialState) => state.btc,
		(state: typeof initialState) => state.changeCurrency,
		(state: typeof initialState) => state.getCurrency,
	],
	(euro, usd, uan, btc, changeCurrency, getCurrency) => ({
		euro,
		usd,
		uan,
		btc,
		changeCurrency,
		getCurrency,
	})
);

export const {
	actions: {
		fetchInitialValuesExceptBtc,
		fetchBtcInitialRate,
		changeCurrencyName,
		getCurrencyName,
	},
	reducer,
} = calculatorSlice;
