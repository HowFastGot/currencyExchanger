import { useState } from 'react';
import { useSelector } from 'react-redux';

import { calculatorSelector } from '../../redux/calculatorSlice';
import { RootStateType } from '../../redux/store';
import {
	multiply,
	divide,
	exchangeCurrencyRate,
	validateUserCalculatorInput,
} from '../../utils/calculatorFunctions';

import { CurrencySelect } from '../components-transponder';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
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

	const handleInputCurrencyValue = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		if (e.target.id === ':r1:') {
			switch (changeCurrency) {
				case 'UAH':
					switch (getCurrency) {
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
					switch (getCurrency) {
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
					switch (getCurrency) {
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
					switch (getCurrency) {
						case 'UAH':
							exchangeCurrencyRate(
								e.target.value,
								usdToBtcRatio,
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
		} else {
			switch (changeCurrency) {
				case 'UAH':
					switch (getCurrency) {
						case 'USD':
							exchangeCurrencyRate(
								e.target.value,
								usd.buy,
								multiply,
								setValue,
								setChangeValue
							);
							break;
						case 'EUR':
							exchangeCurrencyRate(
								e.target.value,
								euro.buy,
								multiply,
								setValue,
								setChangeValue
							);
							break;
						case 'BTC':
							exchangeCurrencyRate(
								e.target.value,
								usdToBtcRatio,
								multiply,
								setValue,
								setChangeValue
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
					switch (getCurrency) {
						case 'UAH':
							exchangeCurrencyRate(
								e.target.value,
								usd.buy,
								divide,
								setValue,
								setChangeValue
							);
							break;
						case 'EUR':
							exchangeCurrencyRate(
								e.target.value,
								usdToEuroRatio,
								divide,
								setValue,
								setChangeValue
							);
							break;
						case 'BTC':
							exchangeCurrencyRate(
								e.target.value,
								btc.buy,
								multiply,
								setValue,
								setChangeValue
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
					switch (getCurrency) {
						case 'UAH':
							exchangeCurrencyRate(
								e.target.value,
								euro.buy,
								divide,
								setValue,
								setChangeValue
							);
							break;
						case 'USD':
							exchangeCurrencyRate(
								e.target.value,
								usdToEuroRatio,
								multiply,
								setValue,
								setChangeValue
							);
							break;
						case 'BTC':
							exchangeCurrencyRate(
								e.target.value,
								euroToBtcRatio,
								multiply,
								setValue,
								setChangeValue
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
					switch (getCurrency) {
						case 'UAH':
							exchangeCurrencyRate(
								e.target.value,
								usdToBtcRatio,
								divide,
								setValue,
								setChangeValue
							);
							break;
						case 'USD':
							exchangeCurrencyRate(
								e.target.value,
								btc.buy,
								divide,
								setValue,
								setChangeValue
							);
							break;
						case 'EUR':
							exchangeCurrencyRate(
								e.target.value,
								euroToBtcRatio,
								divide,
								setValue,
								setChangeValue
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
		}
	};
	return (
		<>
			<Box
				display={'grid'}
				sx={{
					gridTemplate: '1fr /190px 20px 190px',
					justifyItems: 'center',
					alignItems: 'end',
					justifyContent: 'center',
					gap: '10px 50px',
				}}
			>
				<Box
					display='flex'
					sx={{
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
					display='flex'
					sx={{
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
		</>
	);
}
