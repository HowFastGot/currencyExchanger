import { IBtcToUSDRation } from '../../types/apiObjectsInterface';

export function changeBtcAPIObject(
	apiObj: IBtcToUSDRation,
	sellRate: string = '25214.20'
) {
	return {
		name: apiObj.code,
		buy: apiObj['rate_float'],
		sale: sellRate,
	};
}
