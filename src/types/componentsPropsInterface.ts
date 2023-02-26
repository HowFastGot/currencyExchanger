import { CurrencyType } from './slicesInitialStateInterface';

export interface IContainerProps {
	children: React.ReactNode;
}
export interface ICurrencySelectProps {
	defaultValue: CurrencyType;
	isChangeFiled: boolean;
}
