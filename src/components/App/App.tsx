import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';

import { emulateServerError, request } from '../../utils';

import {
	Bottom,
	Header,
	Container,
	TableContent,
	Calculator,
	ErrorMessage,
	ErrorBoundary,
} from '../components-transponder';
import LoadingButton from '@mui/lab/LoadingButton';

import { AppDispatchType, RootStateType } from '../../redux/store';

import './App.scss';
import { errorFetching, fetchBitcoinRate, fetchedResults, fetchingResult } from '../../redux/currencyRatesSlice';
import { fetchBtcInitialRate, fetchInitialValuesExceptBtc } from '../../redux/calculatorSlice';

function App() {
	const mock_apiUrl = '/mockData.json&coursid=4';

	const [isServerError, setServerError] = useState('');
	const [updateData, setUpdateDate] = useState<number>(1);

	const dispath: AppDispatchType = useDispatch();

	const { data: privatMockData, error: privatError, isLoading: privatLoading } = useSWR(mock_apiUrl, request);
	!privatLoading && dispath(fetchInitialValuesExceptBtc(privatMockData));

	const { data: cryproData, error, isLoading } = useSWR('https://api.coindesk.com/v1/bpi/currentprice.json', request);

	!isLoading && dispath(fetchBtcInitialRate(cryproData));
	// dispath(fetchBitcoinRate(cryproData));

	const handleUpdateCurrencies = (): void => {
		setUpdateDate((state) => state + 1);
		localStorage.setItem('count', updateData.toString());
	};

	if (error || privatError) dispath(errorFetching());

	useEffect(() => {
		const errMessage = emulateServerError();
		if (error || privatError || errMessage) setServerError(errMessage ?? 'Server error occured!');

		return () => {
			if (isServerError) {
				setServerError('');
				setUpdateDate(1);
			}
		};
	}, [updateData, isServerError]);

	return (
		<>
			<Header />
			<Container>
				<ErrorBoundary>
					{isServerError ? (
						<ErrorMessage errorText={isServerError} />
					) : (
						<>
							<TableContent loading={isLoading || privatLoading} error={privatError || error} />
							<ErrorBoundary>
								<Calculator />
							</ErrorBoundary>
						</>
					)}
				</ErrorBoundary>

				<LoadingButton
					loading={isLoading || privatLoading}
					variant='outlined'
					children={isServerError ? 'Refresh page' : 'Load currencies'}
					sx={{ width: '250px', m: '0 auto' }}
					onClick={handleUpdateCurrencies}
				/>
			</Container>
			<Bottom />
		</>
	);
}

export default App;
