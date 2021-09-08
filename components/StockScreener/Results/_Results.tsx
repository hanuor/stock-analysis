import { ScreenerData } from 'components/StockScreener/screener.types';
import { ResultsMenu } from './ResultsMenu';
import { ResultsBody } from './ResultsBody';

export function StockScreenerResults({ stocks }: ScreenerData) {
	return (
		<>
			<ResultsMenu />
			<ResultsBody stocks={stocks} />
		</>
	);
}
