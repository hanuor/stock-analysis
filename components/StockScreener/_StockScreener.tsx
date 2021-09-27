import { FiltersMenu } from './_Filters/FiltersMenu/FiltersMenu';
import { RenderFilters } from './_Filters/FiltersBody/FiltersBody';
import { ResultsBody } from './_Results/ResultsBody/ResultsBody';
import { SingleStock } from './screener.types';

type Props = {
	initial: SingleStock[];
	fullCount: number;
};

export function StockScreener({ initial, fullCount }: Props) {
	return (
		<>
			<div className="border rounded p-2 bg-gray-50">
				<FiltersMenu />
				<RenderFilters />
			</div>
			<ResultsBody initial={initial} fullCount={fullCount} />
		</>
	);
}
