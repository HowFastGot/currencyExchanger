import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import {
	changeTableCellFirstColumnElement,
	changeTableCellSecondColumnElement,
	tableBothColumsSelector,
	saveNewCurrencyValue,
} from '../../redux/tableSlice';
import { currencySelector } from '../../redux/currencyRatesSlice';

import { changeInitialCurrencyRateState, isInRequiredRange } from '../../utils';
import { AppDispatchType, RootStateType } from '../../redux/store';

import { ITableCellState } from '../../types/slicesInitialStateInterface';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FormHelperText from '@mui/material/FormHelperText';

export function CustomTextField({
	nameOfColumn,
	index,
}: {
	nameOfColumn: string;
	index: number;
}) {
	const { values } = useSelector((state: RootStateType) => {
		return currencySelector(state.currencyReducer);
	});

	const {
		firstTableObj: { isTrue, columnValue: firstColumnValue },
		secondtTableObj: { columnValue: secondColumnValue },
	} = useSelector((state: RootStateType) => {
		return tableBothColumsSelector(state.tableReducer);
	});

	const defaultValueOfInput =
		nameOfColumn === 'second' ? secondColumnValue : firstColumnValue;

	const [newValue, setNewValue] = useState(defaultValueOfInput.toString());
	const [isError, setIsError] = useState(false);

	const dispatch: AppDispatchType = useDispatch();

	const validateInputValue = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const regExp = /^[0-9]+(.)?([0-9]+)?/gi;

		const targetValueArr = e.target.value.match(regExp);

		const userNewNumber = targetValueArr ? targetValueArr[0] : '';
		if (
			isInRequiredRange(defaultValueOfInput, userNewNumber) ||
			isNaN(+userNewNumber)
		) {
			setIsError(true);
			setNewValue(userNewNumber);
		} else {
			setNewValue(userNewNumber);
			setIsError(false);
		}
	};

	const handleClickCloseBtn = () => {
		const defaultCellStateObj: ITableCellState = {
			isTrue: false,
			indexOfElement: -1,
			columnValue: '0',
			nameOfColumn: nameOfColumn,
		};

		if (isTrue) {
			dispatch(changeTableCellFirstColumnElement(defaultCellStateObj));
		} else {
			dispatch(changeTableCellSecondColumnElement(defaultCellStateObj));
		}
	};

	const handleClickOnSaveBtn = () => {
		const newCellStateObj: ITableCellState = {
			isTrue: false,
			indexOfElement: index,
			columnValue: newValue,
			nameOfColumn: nameOfColumn,
		};

		dispatch(saveNewCurrencyValue(newCellStateObj));

		changeInitialCurrencyRateState(
			values,
			nameOfColumn,
			index,
			newValue,
			dispatch
		);
	};

	return (
		<>
			<ButtonGroup sx={{ width: '10px' }}>
				<Button
					variant='text'
					size='small'
					children={<CheckIcon />}
					onClick={handleClickOnSaveBtn}
					disabled={isError}
					disableRipple
				/>
				<Button
					variant='text'
					size='small'
					children={<CloseIcon color='disabled' />}
					onClick={handleClickCloseBtn}
					disableRipple
				/>
			</ButtonGroup>
			<TextField
				sx={{
					height: '20px',
					width: '50px',
					'& .MuiInputBase-root': {
						height: '20px',
						widht: '20px',
					},
					'& input': {
						padding: '5px',
					},
				}}
				onChange={validateInputValue}
				value={newValue}
				autoFocus
			/>
			{isError ? (
				<FormHelperText
					children='Value should be in 10% range!'
					error
					sx={{ position: 'absolute', whiteSpace: 'nowrap' }}
				/>
			) : null}
		</>
	);
}
