import { FilterMenu } from './Filters/FilterMenu';
import { FilterBody } from './Filters/FilterBody';
import { ResultsMenu } from './Results/ResultsMenu';
import { ResultsBody } from './Results/ResultsBody';

export function StockScreener() {
	return (
		<>
			<FilterMenu />
			<FilterBody />
			<ResultsMenu />
			<ResultsBody />
		</>
	);
}
