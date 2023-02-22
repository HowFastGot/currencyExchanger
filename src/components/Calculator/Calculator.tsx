import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculatorSelector } from '../../redux/calculatorSlice';
import { RootStateType } from '../../redux/store';

import { CurrencySelect, InputText } from '../components-transponder';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';

import './calculator.scss';

export function Calculator() {
	const [value, setValue] = useState('');

	const { euro, usd, uan, btc, changeCurrency, getCurrency } = useSelector(
		(state: RootStateType) => {
			return calculatorSelector(state.calculatorReducer);
		}
	);

	const calculateUAHtoUSD = (insertedValue: string, valueAPI: number) => {
		setValue((+insertedValue * valueAPI).toString());
	};

	const handleInputCurrencyValue = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		switch (changeCurrency) {
			case 'UAH':
				switch (getCurrency) {
					case 'USD':
						calculateUAHtoUSD(e.target.value, usd.buy);
						break;

					default:
						break;
				}

				break;

			default:
				break;
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
					<TextField variant='standard' label='Get' value={value} />
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
