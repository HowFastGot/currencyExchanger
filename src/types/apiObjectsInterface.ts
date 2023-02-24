//=========Bitcoin API=========================================================================
export interface IBtcToUSDRation {
	code: 'USD';
	['rate_float']: string;
}

export interface IApiBtcObj {
	bpi: {
		USD: IBtcToUSDRation;
	};
}

//=========Privat API=========================================================================

export interface IResponseObjPrivatAPI {
	ccy: 'EUR' | 'USD';
	base_ccy: 'UAH';
	buy: string;
	sale: string;
}

export interface IChangedPrivatResponse {
	euro: {
		buy: string;
		sell: string;
	};
	usd: {
		buy: string;
		sell: string;
	};
}
