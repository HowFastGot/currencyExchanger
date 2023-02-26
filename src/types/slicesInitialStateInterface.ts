import { IResponseObjPrivatAPI } from './apiObjectsInterface';
import {
	changeTableCellFirstColumnElement,
	changeTableCellSecondColumnElement,
} from '../redux/tableSlice';

//========Table slice==========================================================================
export interface ITableCellObj {
	name: string;
	buy: string;
	sell: string;
}

export interface IStateBothColums {
	isTrue: boolean;
	indexOfElement: number;
}

export interface ITableCellState {
	isTrue: boolean;
	indexOfElement: number;
	columnValue: string;
	nameOfColumn: string;
}

export interface ITableSliceInitialState {
	columnFirst: ITableCellState;
	columnSecond: ITableCellState;
}

//=======Currency slice===========================================================================
export type CurrencyType = 'UAH' | 'USD' | 'EUR' | 'BTC';

export type currencySliceFunctionsType =
	| typeof changeTableCellFirstColumnElement
	| typeof changeTableCellSecondColumnElement;

export interface ICurrencyInitialState {
	loading: boolean;
	values: IResponseObjPrivatAPI[];
	error: boolean;
}

//======Calculator============================================================================
export type CalculatorSetActionType = React.Dispatch<
	React.SetStateAction<string>
>;

export interface IInitialCalculatorState {
	uan: {
		buy: string;
		sell: string;
	};
	usd: {
		buy: string;
		sell: string;
	};
	euro: {
		buy: string;
		sell: string;
	};
	btc: {
		buy: string;
		sell: string;
	};
	changeCurrency: CurrencyType;
	getCurrency: CurrencyType;
}
