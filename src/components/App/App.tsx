import { useEffect } from 'react';
import {
	Bottom,
	Header,
	Container,
	TableContent,
	Calculator,
} from '../components-transponder';

import { useHttp } from '../../hooks/http.hook';

function App() {
	const { request } = useHttp();

	useEffect(() => {
		request(
			'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5'
		).then(() =>
			request('https://api.coindesk.com/v1/bpi/currentprice.json')
		);
	});

	return (
		<>
			<Header />
			<Container>
				<TableContent />
				<Calculator />
			</Container>
			<Bottom />
		</>
	);
}

export default App;
