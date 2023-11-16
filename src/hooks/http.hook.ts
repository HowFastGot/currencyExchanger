import { useCallback } from 'react';
import { AppDispatchType } from '../redux/store';
import { useDispatch } from 'react-redux';

import { IApiBtcObj, IBtcToUSDRation, IResponseObjPrivatAPI } from '../types/apiObjectsInterface';

import { fetchingResult, errorFetching, fetchedResults, fetchBitcoinRate } from '../redux/currencyRatesSlice';

import { fetchInitialValuesExceptBtc, fetchBtcInitialRate } from '../redux/calculatorSlice';

import { changeBtcAPIObject, emulateServerError, changeApiObject } from '../utils';

export const useHttp = () => {
	const dispath: AppDispatchType = useDispatch();

	const request = useCallback(
		async (url: string, method: 'GET' | 'POST' = 'GET', body: null | string = null): Promise<any> => {
			if (url !== 'https://api.coindesk.com/v1/bpi/currentprice.json') {
				emulateServerError();
				dispath(fetchingResult());
			}

			try {
				const [urlApi, mockUrlQueries] = url.split('&');

				const response = await fetch(urlApi, { method, body });

				if (!response.ok) {
					throw new Error(`Could not fetch ${url}, status: ${response.status}`);
				}

				if (url === 'https://api.coindesk.com/v1/bpi/currentprice.json') {
					const data: IApiBtcObj = await response.json();

					const usdValue: IBtcToUSDRation = data.bpi.USD;
					const changedBtcObj = changeBtcAPIObject(usdValue);
					dispath(fetchBitcoinRate(changedBtcObj));

					dispath(fetchBtcInitialRate(changedBtcObj));
				} else {
					const currencyRatesArray: IResponseObjPrivatAPI[] = await response.json();
					const reducedCurrenciesArray = currencyRatesArray.filter((_, i) => i < +mockUrlQueries.slice(-1));

					dispath(fetchedResults(reducedCurrenciesArray));

					const changedPrivatApiObject = changeApiObject(reducedCurrenciesArray);

					dispath(fetchInitialValuesExceptBtc(changedPrivatApiObject));
				}
			} catch (e) {
				dispath(errorFetching());
				return new Error('Request Error!');
			}
		},
		[dispath]
	);

	return { request };
};
