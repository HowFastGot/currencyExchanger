import { IResponseObjPrivatAPI } from '../../types/apiObjectsInterface';
import { changeInitialValue } from '../../redux/calculatorSlice';
import { createNewCurrencyStateObject } from '../';
import { fetchedResults } from '../../redux/currencyRatesSlice';

export function changeInitialCurrencyRateState(
	values: IResponseObjPrivatAPI[],
	nameOfColumn: string,
	indexInArr: number,
	newValueAfterSave: string,
	dispatchFunction: any
): void {
	const immutableCurrencyArray: IResponseObjPrivatAPI[] = [...values];
	let newCurrObj: IResponseObjPrivatAPI;

	if (nameOfColumn === 'first') {
		newCurrObj = {
			...immutableCurrencyArray[indexInArr],
			buy: newValueAfterSave,
		};
		immutableCurrencyArray.splice(indexInArr, 1, newCurrObj);

		switch (indexInArr) {
			case 0:
				dispatchFunction(
					changeInitialValue(
						createNewCurrencyStateObject('euro', newValueAfterSave)
					)
				);
				break;
			case 1:
				dispatchFunction(
					changeInitialValue(
						createNewCurrencyStateObject('usd', newValueAfterSave)
					)
				);
				break;
			case 2:
				dispatchFunction(
					changeInitialValue(
						createNewCurrencyStateObject('btc', newValueAfterSave)
					)
				);
				break;
			default:
				break;
		}
	} else {
		newCurrObj = {
			...immutableCurrencyArray[indexInArr],
			sale: newValueAfterSave,
		};
		immutableCurrencyArray.splice(indexInArr, 1, newCurrObj);
	}

	immutableCurrencyArray.splice(indexInArr, 1, newCurrObj);
	dispatchFunction(fetchedResults(immutableCurrencyArray));
}
