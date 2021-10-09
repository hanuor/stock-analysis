import { FiltersMenu } from './_Filters/FiltersMenu/FiltersMenu';
import { RenderFilters } from './_Filters/FiltersBody/FiltersBody';
import { ResultsBody } from './_Results/ResultsBody/ResultsBody';

interface Props {
	type: string;
}

export function StockScreener({ type }: Props) {
	return (
		<>
			<div className="border rounded p-2 bg-gray-50">
				<FiltersMenu type={type} />
				<RenderFilters type={type} />
			</div>
			<ResultsBody type={type} />
		</>
	);
}
