import { changeInitialValue } from '../../redux/calculatorSlice';
import { createNewCurrencyStateObject } from '../';
import { ITableCellObj } from '../../types/slicesInitialStateInterface';

export function changeInitialCurrencyRateState(
	values: ITableCellObj[],
	nameOfColumn: string,
	indexInArr: number,
	newValueAfterSave: string,
	dispatchFunction: any
): void {
	const immutableCurrencyArray: ITableCellObj[] = [...values];
	let newCurrObj: ITableCellObj;

	if (nameOfColumn === 'first') {
		newCurrObj = {
			...immutableCurrencyArray[indexInArr],
			buy: newValueAfterSave,
		};
		immutableCurrencyArray.splice(indexInArr, 1, newCurrObj);

		switch (indexInArr) {
			case 0:
				dispatchFunction(changeInitialValue(createNewCurrencyStateObject('euro', newValueAfterSave)));
				break;
			case 1:
				dispatchFunction(changeInitialValue(createNewCurrencyStateObject('usd', newValueAfterSave)));
				break;
			case 2:
				dispatchFunction(changeInitialValue(createNewCurrencyStateObject('btc', newValueAfterSave)));
				break;
			default:
				break;
		}
	} else {
		newCurrObj = {
			...immutableCurrencyArray[indexInArr],
			sell: newValueAfterSave,
		};
		immutableCurrencyArray.splice(indexInArr, 1, newCurrObj);
	}
}
