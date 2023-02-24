import { useCallback } from 'react';
import { AppDispatchType } from '../redux/store';
import { useDispatch } from 'react-redux';

import {
	IApiBtcObj,
	IBtcToUSDRation,
	IResponseObjPrivatAPI,
} from '../types/apiObjectsInterface';

import {
	fetchingResult,
	errorFetching,
	fetchedResults,
	fetchBitcoinRate,
} from '../redux/currencyRatesSlice';

import {
	fetchInitialValuesExceptBtc,
	fetchBtcInitialRate,
} from '../redux/calculatorSlice';

import { changeApiObject } from '../utils/changeAPIresponseData/changeAPIresponseData';
import { changeBtcAPIObject } from '../utils/changeBtcAPIObject';

export const useHttp = () => {
	const dispath: AppDispatchType = useDispatch();

	const request = useCallback(
		async (
			url: string,
			method: 'GET' | 'POST' = 'GET',
			body: null | string = null
		) => {
			if (url !== 'https://api.coindesk.com/v1/bpi/currentprice.json') {
				dispath(fetchingResult());
			}

			try {
				const response = await fetch(url, { method, body });

				if (!response.ok) {
					throw new Error(
						`Could not fetch ${url}, status: ${response.status}`
					);
				}

				if (
					url === 'https://api.coindesk.com/v1/bpi/currentprice.json'
				) {
					const data: IApiBtcObj = await response.json();

					const usdValue: IBtcToUSDRation = data.bpi.USD;
					const changedBtcObj = changeBtcAPIObject(usdValue);
					dispath(fetchBitcoinRate(changedBtcObj));

					dispath(fetchBtcInitialRate(changedBtcObj));
				} else {
					const currencyRatesArray: IResponseObjPrivatAPI[] =
						await response.json();

					dispath(fetchedResults(currencyRatesArray));

					const changedPrivatApiObject =
						changeApiObject(currencyRatesArray);

					dispath(
						fetchInitialValuesExceptBtc(changedPrivatApiObject)
					);
				}
			} catch (e) {
				dispath(errorFetching());
			}
		},
		[dispath]
	);

	return { request };
};
