import {
	IResponseObjPrivatAPI,
	IChangedPrivatResponse,
} from '../../types/apiObjectsInterface';
import { ITableCellObj } from '../../types/slicesInitialStateInterface';

export function NameModificator(
	response: IResponseObjPrivatAPI
): ITableCellObj {
	const name = response.base_ccy
		? `${response.base_ccy}/${response.ccy}`
		: 'BTC/USD';

	const modernResponse: ITableCellObj = {
		name: name,
		buy: parseFloat(response.buy).toFixed(2),
		sell: parseFloat(response.sale).toFixed(2),
	};

	return modernResponse;
}

export function changeApiObject(
	response: IResponseObjPrivatAPI[]
): IChangedPrivatResponse {
	return {
		euro: {
			buy: response[0].buy ?? '0',
			sell: response[0].sale ?? '0',
		},
		usd: {
			buy: response[1].buy ?? '0',
			sell: response[1].sale ?? '0',
		},
	};
}
