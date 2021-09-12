import { FiltersMap } from 'components/StockScreener/maps/filters.map';
import { SingleFilter } from './SingleFilter';

export function FilterBody() {
	return (
		<>
			<div className="grid grid-cols-1 bp:grid-cols-2 lg:grid-cols-4 divide-y divide-x border-r text-smaller bg-gray-50">
				{FiltersMap.map((filter) => (
					<SingleFilter key={filter.name} filter={filter} />
				))}
			</div>
		</>
	);
}
