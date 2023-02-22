import { configureStore } from '@reduxjs/toolkit';

import { reducer as tableReducer } from './tableSlice';
import { reducer as currencyReducer } from './currencyRatesSlice';
import { reducer as calculatorReducer } from './calculatorSlice';

const store = configureStore({
	reducer: { tableReducer, currencyReducer, calculatorReducer },
	devTools: process.env.NODE_ENV !== 'production',
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

export default store;
