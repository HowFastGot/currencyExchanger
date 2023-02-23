import { ReactNode } from 'react';
import {
	changeTableCellFirstColumnElement,
	changeTableCellSecondColumnElement,
} from '../redux/tableSlice';

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
//=================================================================

export interface IResponseObjPrivatAPI {
	ccy: 'EUR' | 'USD';
	base_ccy: 'UAH';
	buy: string;
	sale: string;
}

export interface ICurrencyInitialState {
	loading: boolean;
	values: IResponseObjPrivatAPI[];
	error: boolean;
}

export type currencySliceFunctionsType =
	| typeof changeTableCellFirstColumnElement
	| typeof changeTableCellSecondColumnElement;

//=================================================================

export interface IStateBothColums {
	isTrue: boolean;
	indexOfElement: number;
}

export interface IContainerProps {
	children: ReactNode;
}

export interface IInputTextProps {
	label: 'Change' | 'Get';
}

export interface ICurrencySelectProps {
	defaultValue: 'UAH' | 'USD';
	isChangeFiled: boolean;
}

export interface ITableCellObj {
	name: string;
	buy: string;
	sell: string;
}

//==================================================================================
export type CalculatorSetActionType = React.Dispatch<
	React.SetStateAction<string>
>;

type CurrencyType = 'UAH' | 'USD' | 'EUR' | 'BTC';

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
