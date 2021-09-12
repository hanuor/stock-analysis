import { FiltersMap } from 'components/StockScreener/maps/filters.map';
import { SingleFilter } from './SingleFilter';

export function FilterBody() {
	return (
		<>
			<div className="grid grid-cols-1 bp:grid-cols-2 lg:grid-cols-4 gap-x-3 text-base pt-1">
				{FiltersMap.map((filter) => (
					<SingleFilter key={filter.name} filter={filter} />
				))}
			</div>
		</>
	);
}
