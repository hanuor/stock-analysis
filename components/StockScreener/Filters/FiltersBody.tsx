import { FiltersMap } from 'components/StockScreener/maps/filters.map';
import { FilterWrap } from './Filter/__FilterWrap';

export function FiltersBody() {
	return (
		<>
			<div className="grid grid-cols-1 bp:grid-cols-2 lg:grid-cols-4 gap-x-3 text-base pt-1">
				{FiltersMap.map((filter) => (
					<FilterWrap key={filter.name} filter={filter} />
				))}
			</div>
		</>
	);
}
