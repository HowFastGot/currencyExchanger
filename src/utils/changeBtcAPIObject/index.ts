import { IBtcToUSDRation } from '../../types/apiObjectsInterface';

export function changeBtcAPIObject(apiObj: IBtcToUSDRation, sellRate: string = '39988') {
	return {
		name: apiObj.code,
		buy: apiObj['rate_float'],
		sell: sellRate,
	};
}
