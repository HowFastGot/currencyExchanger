import { createSelector, createSlice } from '@reduxjs/toolkit';
import { ICurrencyInitialState, IResponseObjPrivatAPI } from '../types';

interface IAction {
	payload: IResponseObjPrivatAPI[];
	type: string;
}
const initialState: ICurrencyInitialState = {
	loading: true,
	values: [],
	error: false,
};

const currencyValuesSlice = createSlice({
	name: 'currencySlice',
	initialState,
	reducers: {
		fetchingResult: (state) => {
			state.loading = true;
			state.error = false;
		},
		errorFetching: (state) => {
			state.loading = false;
			state.error = true;
		},
		fetchedResults: (state, action: IAction) => {
			state.values = action.payload;
			state.loading = false;
			state.error = false;
		},
		fetchBitcoinRate: (state, action) => {
			if (state.values.length === 2) {
				state.values = [...state.values, action.payload];
				state.loading = false;
				state.error = false;
			}
		},
	},
});

export const currencySelector = createSelector(
	[
		(state: ICurrencyInitialState) => state.values,
		(state: ICurrencyInitialState) => state.loading,
		(state: ICurrencyInitialState) => state.error,
	],
	(values, loading, error) => ({
		values,
		loading,
		error,
	})
);

export const {
	actions: {
		fetchingResult,
		errorFetching,
		fetchedResults,
		fetchBitcoinRate,
	},
	reducer,
} = currencyValuesSlice;
