import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
	const [isServerError, setServerError] = useState('');
	const [updateData, setUpdateDate] = useState(1);
	const loading = useSelector(
		(state: RootStateType) => state.currencyReducer.loading
	);

	const { request } = useHttp();

	const handleUpdateCurrencies = (): void => {
		setUpdateDate((state) => state + 1);

		console.log(localStorage);

		if (isServerError) {
			setServerError('');
		}
	};

	useEffect(() => {
		request(
			'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
		)
			.then(() =>
				request('https://api.coindesk.com/v1/bpi/currentprice.json')
			)
			.catch((error) => {
				setServerError(error.message);
			})
			.finally();
	}, [request, updateData]);

	return (
		<>
			<Header />
			<Container>
				<ErrorBoundary>
					{isServerError ? (
						<ErrorMessage errorText={isServerError} />
					) : (
						<TableContent />
					)}
				</ErrorBoundary>
				<ErrorBoundary>
					<Calculator />
				</ErrorBoundary>

				<LoadingButton
					loading={loading}
					variant='outlined'
					children={
						isServerError ? 'Refresh page0 ' : 'Refresh currencies'
					}
					sx={{ width: '250px', m: '0 auto' }}
					onClick={handleUpdateCurrencies}
				/>
			</Container>
			<Bottom />
		</>
	);
}

export default App;
