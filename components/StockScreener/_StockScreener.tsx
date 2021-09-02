import { StockScreenerFilter } from './Filters/_Filters';
import { StockScreenerResults } from './Results';

export function StockScreener() {
	return (
		<>
			<StockScreenerFilter />
			<StockScreenerResults />
		</>
	);
}
