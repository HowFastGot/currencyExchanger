import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useSWR from 'swr';

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

import { RootStateType } from '../../redux/store';

import { useHttp } from '../../hooks/http.hook';

import './App.scss';

function App() {
	const mock_apiUrl = '/mockData.json&coursid=4';

	const [isServerError, setServerError] = useState('');
	const [updateData, setUpdateDate] = useState<number>(1);

	const loading = useSelector((state: RootStateType) => state.currencyReducer.loading);

	const { request } = useHttp();
	useSWR(mock_apiUrl, request);
	useSWR('https://api.coindesk.com/v1/bpi/currentprice.json', request);

	const handleUpdateCurrencies = (): void => {
		setUpdateDate((state) => state + 1);
		localStorage.setItem('count', updateData.toString());
	};

	useEffect(() => {
		request(mock_apiUrl).catch((error) => {
			setServerError(error.message);
		});

		return () => {
			if (isServerError) {
				setServerError('');
				setUpdateDate(1);
			}
		};
	}, [request, updateData, isServerError]);

	return (
		<>
			<Header />
			<Container>
				<ErrorBoundary>{isServerError ? <ErrorMessage errorText={isServerError} /> : <TableContent />}</ErrorBoundary>
				<ErrorBoundary>
					<Calculator />
				</ErrorBoundary>

				<LoadingButton
					loading={loading}
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
