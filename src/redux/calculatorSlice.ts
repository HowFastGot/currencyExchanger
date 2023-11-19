import { createSlice, createSelector } from '@reduxjs/toolkit';

import { IInitialCalculatorState } from '../types/slicesInitialStateInterface';

//==================================================================================

const initialState: IInitialCalculatorState = {
	uan: {
		buy: ' 1',
		sell: '1',
	},
	usd: {
		buy: '0',
		sell: '0',
	},
	euro: {
		buy: '0',
		sell: '0',
	},
	btc: {
		buy: '0',
		sell: '0',
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
						buy: string;
						sell: string;
					};
					euro: {
						buy: string;
						sell: string;
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
		changeInitialValue: (
			state,
			action: {
				payload: {
					currency: 'btc' | 'usd' | 'euro';
					value: string;
				};
			}
		) => {
			state[action.payload.currency]['buy'] = action.payload.value;
		},
	},
});

export const calculatorSelector = createSelector(
	[
		(state: typeof initialState) => state.euro,
		(state: typeof initialState) => state.usd,
		(state: typeof initialState) => state.btc,
		(state: typeof initialState) => state.changeCurrency,
		(state: typeof initialState) => state.getCurrency,
	],
	(euro, usd, btc, changeCurrency, getCurrency) => {
		console.log(btc);

		return {
			euro,
			usd,
			btc,
			changeCurrency,
			getCurrency,
			usdToEuroRatio: (+usd.buy / +euro.buy).toString(),
			usdToBtcRatio: (+btc.buy * +usd.buy).toString(),
			euroToBtcRatio: (+btc.buy * (+usd.buy / +euro.buy)).toString(),
			allCurrencyValues: [
				{ ...euro, name: 'EURO/UAH' },
				{ ...usd, name: 'USD/UAH' },
				{ ...btc, name: 'USD/BTC' },
			],
		};
	}
);

export const {
	actions: {
		fetchInitialValuesExceptBtc,
		fetchBtcInitialRate,
		changeCurrencyName,
		getCurrencyName,
		changeInitialValue,
	},
	reducer,
} = calculatorSlice;
