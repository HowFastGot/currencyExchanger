import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	tableBothColumsSelector,
	changeTableCellFirstColumnElement,
	changeTableCellSecondColumnElement,
} from '../../redux/tableSlice';

import { currencySelector } from '../../redux/currencyRatesSlice';

import { CustomTextField, TableSceleton } from '../components-transponder';
import { ITableCellObj } from '../../types/slicesInitialStateInterface';

import { AppDispatchType, RootStateType } from '../../redux/store';
import { createData, NameModificator } from '../../utils';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

import './tableContent.scss';

export function TableContent() {
	const [rows, setRows] = useState<ITableCellObj[]>([]);
	const {
		firstTableObj: { isTrue: isTextFieldBuyCol, indexOfElement: indexOfElementFirstCol },
		secondtTableObj: { isTrue: isTextFieldSellCol, indexOfElement: indexOfElementSecondCol },
	} = useSelector((state: RootStateType) => {
		return tableBothColumsSelector(state.tableReducer);
	});

	const { values, loading, error } = useSelector((state: RootStateType) => {
		return currencySelector(state.currencyReducer);
	});

	const dispatch: AppDispatchType = useDispatch();

	useEffect(() => {
		const funcCreatorsArray: ITableCellObj[] = [];

		values.forEach((currency) => {
			const { name, buy, sell }: ITableCellObj = NameModificator(currency);

			funcCreatorsArray.push(createData(name, buy, sell));
		});

		setRows(funcCreatorsArray);
	}, [values]);

	const changeContentOfTableCellBothCol = (
		nameOfColumn: string,
		rowValue: string,
		index: number,
		isTextStateFieldBoth: boolean,
		indexOfElementFromState: number,
		changeStateFunc: typeof changeTableCellFirstColumnElement | typeof changeTableCellSecondColumnElement
	): JSX.Element => {
		if (isTextStateFieldBoth && index === indexOfElementFromState) {
			return (
				<>
					<CustomTextField nameOfColumn={nameOfColumn} index={index} />
				</>
			);
		} else {
			return (
				<div className='TableDiv_hower'>
					{rowValue}
					<Button
						color='info'
						children={<EditIcon fontSize='small' />}
						onClick={() => {
							dispatch(
								changeStateFunc({
									isTrue: !isTextStateFieldBoth,
									indexOfElement: index,
									columnValue: rowValue,
									nameOfColumn: nameOfColumn,
								})
							);
						}}
						disableRipple
					/>
				</div>
			);
		}
	};

	const chooseContentDependOnLoadingOrError = (loading: boolean, error: boolean): JSX.Element | JSX.Element[] => {
		if (loading) {
			return (
				<>
					<TableSceleton position={'15px'} />
					<TableSceleton position={'70px'} />
					<TableSceleton position={'120px'} />
				</>
			);
		}

		if (error) {
			throw new Error('Loading error, check internet connection or CORS policy!');
		}

		return rows.map((row, index) => (
			<TableRow
				key={row.name}
				sx={{
					'&:last-child td, &:last-child th': {
						border: 0,
					},
				}}>
				<TableCell scope='row'>{row.name}</TableCell>
				<TableCell align='center' classes={{ root: 'TableCell_hower' }}>
					{changeContentOfTableCellBothCol(
						'first',
						row.buy,
						index,
						isTextFieldBuyCol,
						indexOfElementFirstCol,
						changeTableCellFirstColumnElement
					)}
				</TableCell>
				<TableCell align='center' classes={{ root: 'TableCell_hower' }}>
					{changeContentOfTableCellBothCol(
						'second',
						row.sell,
						index,
						isTextFieldSellCol,
						indexOfElementSecondCol,
						changeTableCellSecondColumnElement
					)}
				</TableCell>
			</TableRow>
		));
	};

	return (
		<TableContainer
			component={Paper}
			sx={{
				overflow: 'auto',
				minHeight: '219px',
				minWidth: '240px',
			}}>
			<Table sx={{}} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell align='left' size='small'>
							Currency/ Current
							<br />
							Date
						</TableCell>
						<TableCell align='center' scope='col' sx={{ width: '50px' }}>
							Buy
						</TableCell>
						<TableCell align='center' scope='col' sx={{ width: '120px' }}>
							Sell
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody sx={{ position: 'relative', width: '100%' }}>
					{chooseContentDependOnLoadingOrError(loading, error)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
