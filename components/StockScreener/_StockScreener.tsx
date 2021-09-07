import { ScreenerData } from 'components/StockScreener/screener.types';
import { StockScreenerFilter } from './Filters/_Filters';
import { StockScreenerResults } from './Results/_Results';

export function StockScreener({ stocks }: ScreenerData) {
	return (
		<>
			<StockScreenerFilter />
			<StockScreenerResults stocks={stocks} />
		</>
	);
}
