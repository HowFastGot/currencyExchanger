import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import {
	changeCurrencyName,
	getCurrencyName,
} from '../../redux/calculatorSlice';

import { ICurrencySelectProps } from '../../types';

export function CurrencySelect({
	defaultValue,
	isChangeFiled,
}: ICurrencySelectProps) {
	const dispatch = useDispatch();

	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		if (isChangeFiled) {
			dispatch(changeCurrencyName(e.target.value));
		} else {
			dispatch(getCurrencyName(e.target.value));
		}
	};

	return (
		<Box
			sx={{
				width: 69,
				'& .css-v4u5dn-MuiInputBase-root-MuiInput-root:before ': {
					display: 'none',
				},
				'& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after': {
					display: 'none',
				},
			}}
		>
			<FormControl fullWidth>
				<NativeSelect
					defaultValue={defaultValue}
					onChange={handleSelectChange}
					inputProps={{
						name: 'age',
						id: 'uncontrolled-native',
					}}
				>
					<option value={'UAH'}>UAH</option>
					<option value={'USD'}>USD</option>
					<option value={'EUR'}>EUR</option>
					<option value={'BTC'}>BTC</option>
				</NativeSelect>
			</FormControl>
		</Box>
	);
}
