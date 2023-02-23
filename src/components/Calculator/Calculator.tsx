import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculatorSelector } from '../../redux/calculatorSlice';
import { RootStateType } from '../../redux/store';

import { CurrencySelect } from '../components-transponder';

import { multiply, divide } from '../../utils/calculatorFunctions';

import { CalculatorSetActionType } from '../../types';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

import './calculator.scss';

export function Calculator() {
	const [getValue, setValue] = useState('');
	const [changeValue, setChangeValue] = useState('');

	const {
		euro,
		usd,
		btc,
		changeCurrency,
		getCurrency,
		usdToEuroRatio,
		usdToBtcRatio,
		euroToBtcRatio,
	} = useSelector((state: RootStateType) => {
		return calculatorSelector(state.calculatorReducer);
	});

	const validateUserCalculatorInput = (
		userInputString: string,
		setInputContent: React.Dispatch<React.SetStateAction<string>>
	): string => {
		const regExp = /^[0-9]+(.)?([0-9]+)?/gi;
		const foundMatchesArr = userInputString.match(regExp);

		if (foundMatchesArr) {
			const filteredValue: string = foundMatchesArr.toString();

			if (isNaN(+filteredValue)) return filteredValue.slice(0, -1);

			setInputContent(filteredValue);
			return filteredValue;
		} else {
			if (userInputString === '') {
				setInputContent('');
			}
			return '';
		}
	};

	const exchangeCurrencyRate = (
		usersInsertedValue: string,
		currencyApiValue: string,
		operation: (num1: string, num2: string) => string,
		setChangeInputContent: CalculatorSetActionType,
		setGetInputContent: CalculatorSetActionType
	): void => {
		const validatedString = validateUserCalculatorInput(
			usersInsertedValue,
			setChangeInputContent
		);

		if (validatedString.length < 1) {
			setGetInputContent('');
			return;
		}

		const rate = operation(validatedString, currencyApiValue);
		setGetInputContent(rate);
	};

	const handleInputCurrencyValue = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const targetChangeValue =
			e.target.id === ':r1:' ? changeCurrency : getCurrency;
		const targetGetValue =
			e.target.id === ':r3:' ? changeCurrency : getCurrency;

		switch (targetChangeValue) {
			case 'UAH':
				switch (targetGetValue) {
					case 'USD':
						exchangeCurrencyRate(
							e.target.value,
							usd.buy,
							divide,
							setChangeValue,
							setValue
						);
						break;
					case 'EUR':
						exchangeCurrencyRate(
							e.target.value,
							euro.buy,
							divide,
							setChangeValue,
							setValue
						);
						break;
					case 'BTC':
						exchangeCurrencyRate(
							e.target.value,
							usdToBtcRatio,
							divide,
							setChangeValue,
							setValue
						);
						break;
					default:
						setValue(
							validateUserCalculatorInput(
								e.target.value,
								setChangeValue
							)
						);
				}
				break;
			case 'USD':
				switch (targetGetValue) {
					case 'UAH':
						exchangeCurrencyRate(
							e.target.value,
							usd.buy,
							multiply,
							setChangeValue,
							setValue
						);
						break;
					case 'EUR':
						exchangeCurrencyRate(
							e.target.value,
							usdToEuroRatio,
							multiply,
							setChangeValue,
							setValue
						);
						break;
					case 'BTC':
						exchangeCurrencyRate(
							e.target.value,
							btc.buy,
							divide,
							setChangeValue,
							setValue
						);
						break;

					default:
						setValue(
							validateUserCalculatorInput(
								e.target.value,
								setChangeValue
							)
						);
						break;
				}
				break;
			case 'EUR':
				switch (targetGetValue) {
					case 'UAH':
						exchangeCurrencyRate(
							e.target.value,
							euro.buy,
							multiply,
							setChangeValue,
							setValue
						);
						break;
					case 'USD':
						exchangeCurrencyRate(
							e.target.value,
							usdToEuroRatio,
							divide,
							setChangeValue,
							setValue
						);
						break;
					case 'BTC':
						exchangeCurrencyRate(
							e.target.value,
							euroToBtcRatio,
							divide,
							setChangeValue,
							setValue
						);
						break;

					default:
						setValue(
							validateUserCalculatorInput(
								e.target.value,
								setChangeValue
							)
						);
						break;
				}

				break;
			case 'BTC':
				switch (targetGetValue) {
					case 'UAH':
						exchangeCurrencyRate(
							e.target.value,
							btc.buy,
							multiply,
							setChangeValue,
							setValue
						);
						break;
					case 'USD':
						exchangeCurrencyRate(
							e.target.value,
							btc.buy,
							multiply,
							setChangeValue,
							setValue
						);
						break;
					case 'EUR':
						exchangeCurrencyRate(
							e.target.value,
							euroToBtcRatio,
							multiply,
							setChangeValue,
							setValue
						);
						break;
					default:
						setValue(
							validateUserCalculatorInput(
								e.target.value,
								setChangeValue
							)
						);
						break;
				}
				break;
			default:
				throw new Error('Added new currency. Please, check!');
		}
	};
	return (
		<>
			<Box
				sx={{
					display: 'grid',
					gridTemplate: '1fr /190px 20px 190px',
					justifyItems: 'center',
					alignItems: 'end',
					justifyContent: 'center',
					gap: '10px 50px',

					'& .MuiInputBase-input': {
						width: '100px',
						fontSize: '17px',
						color: '#000',
						fontWeight: '900',
					},
				}}
			>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'end',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<TextField
						variant='standard'
						label='Change'
						onChange={handleInputCurrencyValue}
						value={changeValue}
					/>
					<CurrencySelect defaultValue='UAH' isChangeFiled={true} />
				</Box>

				<IconButton>
					<SyncAltIcon />
				</IconButton>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'end',
						justifyContent: 'space-between',
						width: '100%',
					}}
				>
					<TextField
						variant='standard'
						label='Get'
						onChange={handleInputCurrencyValue}
						value={getValue}
					/>
					<CurrencySelect defaultValue='USD' isChangeFiled={false} />
				</Box>
			</Box>
			<LoadingButton
				variant='outlined'
				children={'Process'}
				sx={{ width: '150px', margin: '0 auto' }}
			/>
		</>
	);
}
