import { createSlice, createSelector } from '@reduxjs/toolkit';

import {
	ITableSliceInitialState,
	ITableCellState,
} from '../types/slicesInitialStateInterface';

const columnStateObj: ITableCellState = {
	isTrue: false,
	indexOfElement: -1,
	columnValue: '0',
	nameOfColumn: 'unknown',
};

const initialState: ITableSliceInitialState = {
	columnFirst: columnStateObj,
	columnSecond: columnStateObj,
};

const tableSlice = createSlice({
	name: 'table-reducer',
	initialState,
	reducers: {
		changeTableCellFirstColumnElement: (
			state,
			action: {
				payload: ITableCellState;
			}
		) => {
			const actionIsEditiableField = action.payload.isTrue;
			const actionIndexOfElement = action.payload.indexOfElement;
			const actionNewValue = action.payload.columnValue;

			if (actionIndexOfElement === -1) {
				state.columnFirst.isTrue = false;
				return;
			}

			if (state.columnFirst.isTrue && !actionIsEditiableField) {
				state.columnFirst.isTrue = actionIsEditiableField;

				state.columnFirst.isTrue = true;
				state.columnFirst.indexOfElement = actionIndexOfElement;
				state.columnFirst.columnValue = actionNewValue;
			} else {
				state.columnFirst.isTrue = actionIsEditiableField;
				state.columnFirst.indexOfElement = actionIndexOfElement;
				state.columnFirst.columnValue = actionNewValue;
			}
		},
		changeTableCellSecondColumnElement: (
			state,
			action: {
				payload: ITableCellState;
			}
		) => {
			const actionIsEditiableField = action.payload.isTrue;
			const actionIndexOfElement = action.payload.indexOfElement;
			const actionNewValue = action.payload.columnValue;

			state.columnSecond.isTrue = actionIsEditiableField;
			state.columnSecond.indexOfElement = actionIndexOfElement;
			state.columnSecond.columnValue = actionNewValue;
		},
		saveNewCurrencyValue: (
			state,
			action: {
				payload: {
					columnValue: string;
					indexOfElement: number;
					isTrue: boolean;
					nameOfColumn: 'second' | 'first' | string;
				};
			}
		) => {
			const nameOfCulumn = action.payload.nameOfColumn;

			if (nameOfCulumn === 'second') {
				state.columnSecond = action.payload;
			} else {
				state.columnFirst = action.payload;
			}
		},
	},
});

export const tableBothColumsSelector = createSelector(
	[
		(state: ITableSliceInitialState) => state.columnFirst,
		(state: ITableSliceInitialState) => state.columnSecond,
	],
	(firstTableObj, secondtTableObj) => ({
		firstTableObj,
		secondtTableObj,
	})
);

export const {
	actions: {
		changeTableCellFirstColumnElement,
		changeTableCellSecondColumnElement,
		saveNewCurrencyValue,
	},
	reducer,
} = tableSlice;
