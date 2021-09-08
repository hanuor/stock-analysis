import { ScreenerData } from 'components/StockScreener/screener.types';
import { FilterMenu } from './Filters/FilterMenu';
import { FilterBody } from './Filters/FilterBody';
import { ResultsMenu } from './Results/ResultsMenu';
import { ResultsBody } from './Results/ResultsBody';

export function StockScreener({ stocks }: ScreenerData) {
	return (
		<>
			<FilterMenu />
			<FilterBody />
			<ResultsMenu />
			<ResultsBody stocks={stocks} />
		</>
	);
}
