import { FiltersMenu } from './Filters/FiltersMenu';
import { FiltersBody } from './Filters/FiltersBody';
import { ResultsMenu } from './Results/ResultsMenu';
import { ResultsBody } from './Results/ResultsBody';

export function StockScreener() {
	return (
		<>
			<FiltersMenu />
			<FiltersBody />
			<ResultsMenu />
			<ResultsBody />
		</>
	);
}
