import { useCallback } from 'react';
import { AppDispatchType } from '../redux/store';
import { useDispatch } from 'react-redux';

import { IResponseObjPrivatAPI } from '../types';
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
import { changeApiObject } from '../utils/changeAPIresponseData';

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
					const data: {
						bpi: {
							USD: { code: 'USD'; rate_float: string };
						};
					} = await response.json();

					const usdValue: {
						code: 'USD';
						['rate_float']: string;
					} = data.bpi.USD;

					dispath(
						fetchBitcoinRate({
							name: usdValue.code,
							buy: usdValue['rate_float'],
							sale: '25214.20',
						})
					);

					const calculatorObj = {
						buy: usdValue['rate_float'],
						sell: 25214.2,
					} as const;
					dispath(fetchBtcInitialRate(calculatorObj));
				} else {
					const data: IResponseObjPrivatAPI[] = await response.json();

					dispath(fetchedResults(data));

					const newObj = changeApiObject(data);

					dispath(fetchInitialValuesExceptBtc(newObj));
				}
			} catch (e) {
				dispath(errorFetching());
			}
		},
		[dispath]
	);

	return { request };
};
