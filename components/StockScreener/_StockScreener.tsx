import { FiltersMenu } from './_Filters/FiltersMenu/FiltersMenu';
import { RenderFilters } from './_Filters/FiltersBody/FiltersBody';
import { ResultsBody } from './_Results/ResultsBody/ResultsBody';
import { AboveScreener } from './_Above/_AboveScreener';

export function StockScreener() {
	return (
		<>
			<AboveScreener />
			<div className="border rounded p-2 bg-gray-50">
				<FiltersMenu />
				<RenderFilters />
			</div>
			<ResultsBody />
		</>
	);
}
