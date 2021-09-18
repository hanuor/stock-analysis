import { FiltersMenu } from './_Filters/FiltersMenu/FiltersMenu';
import { RenderFilters } from './_Filters/FiltersBody/RenderFilters';
import { ResultsMenu } from './_Results/ResultsMenu';
import { ResultsBody } from './_Results/ResultsBody';

export function StockScreener() {
	return (
		<>
			<FiltersMenu />
			<RenderFilters />
			<ResultsMenu />
			<ResultsBody />
		</>
	);
}
