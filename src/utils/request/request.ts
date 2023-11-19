import { IApiBtcObj, IBtcToUSDRation, IResponseObjPrivatAPI } from '../../types/apiObjectsInterface';

import { changeBtcAPIObject, emulateServerError, changeApiObject } from '..';

export const request = async (
	url: string,
	method: 'GET' | 'POST' = 'GET',
	body: null | string = null
): Promise<any> => {
	try {
		const [urlApi, mockUrlQueries] = url.split('&');

		const response = await fetch(urlApi, { method, body });

		if (!response.ok) {
			throw new Error(`Could not fetch ${url}, status: ${response.status}`);
		}

		if (url === 'https://api.coindesk.com/v1/bpi/currentprice.json') {
			const data: IApiBtcObj = await response.json();
			const usdValue: IBtcToUSDRation = data.bpi.USD;

			return changeBtcAPIObject(usdValue);
		} else {
			const currencyRatesArray: IResponseObjPrivatAPI[] = await response.json();
			const reducedCurrenciesArray = currencyRatesArray.filter((_, i) => i < +mockUrlQueries.slice(-1));

			return changeApiObject(reducedCurrenciesArray);
		}
	} catch (e) {
		return new Error('Request Error!');
	}
};
