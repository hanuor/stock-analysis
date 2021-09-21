import { FiltersMenu } from './_Filters/FiltersMenu/FiltersMenu';
import { RenderFilters } from './_Filters/FiltersBody/RenderFilters';
import { ResultsBody } from './_Results/ResultsBody/ResultsBody';

export function StockScreener() {
	return (
		<>
			<FiltersMenu />
			<RenderFilters />
			<ResultsBody />
		</>
	);
}
