import { screenerState } from 'components/StockScreener/screener.state';
import { SelectComparison } from './SelectComparison';
import { isFilterSelected } from 'components/StockScreener/functions/isFilterSelected';
import {
	ComparisonOption,
	FilterProps,
} from 'components/StockScreener/screener.types';
import { useEffect, useState } from 'react';
import { getFilterFromString } from 'components/StockScreener/functions/filterString/getFilterFromString';
import { createFilterString } from 'components/StockScreener/functions/filterString/createFilterString';

export function CustomChoice({ filter }: { filter: FilterProps }) {
	const { columnId, name, filterType } = filter;
	const [compare, setCompare] = useState<ComparisonOption>('over');
	const [first, setFirst] = useState<string>('');
	const [second, setSecond] = useState<string>('');
	const [active, setActive] = useState<string | false>();
	const filters = screenerState((state) => state.filters);
	const addFilter = screenerState((state) => state.addFilter);
	const removeFilter = screenerState((state) => state.removeFilter);

	// Extract the filter values in order to populate the custom choice inputs
	useEffect(() => {
		setActive(isFilterSelected(filter.columnId, filters));

		if (active) {
			const filterObject = getFilterFromString(active);

			setCompare(filterObject.compare);
			setFirst(filterObject.first);
			setSecond(filterObject.second);

			if (filterObject.compare !== 'between' && filterObject.second !== '') {
				setSecond('');
			}
		} else {
			setFirst('');
			setSecond('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters, active, filter.columnId]);

	// Update the filter if the values in the custom choice inputs change
	useEffect(() => {
		// If values have been cleared, remove the filter
		if (!first && !second) {
			removeFilter(columnId);
			setActive(false);
		}

		// If the values are valid, create a new filter string and update the filter
		else {
			const filterString = createFilterString({ compare, first, second });
			if (filterString !== active) {
				setActive(filterString);
				removeFilter(columnId);
				addFilter({ columnId, name, value: filterString, filterType });
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [compare, first, second]);

	return (
		<div className="border-b border-gray-200 p-1 pb-2 pr-2 text-sm space-y-1">
			<div className="flex items-center justify-start space-x-1">
				<div>
					<SelectComparison compare={compare} setCompare={setCompare} />
				</div>
				<input
					type="text"
					placeholder="Value"
					value={first}
					onChange={(e) => setFirst(e.target.value)}
					tabIndex={0}
					className="shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm block border-gray-300 rounded-sm p-1 max-w-[4rem]"
				/>
				<div className={compare === 'between' ? 'block' : 'hidden'}>&</div>
				<input
					type="text"
					placeholder="Value"
					value={second}
					onChange={(e) => setSecond(e.target.value)}
					tabIndex={0}
					className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm block border-gray-300 rounded-sm p-1 max-w-[4rem]${
						compare === 'between' ? ' block' : ' hidden'
					}`}
				/>
			</div>
			{(first || second) && (
				<div className="ml-2 text-gray-600 whitespace-normal">{`"${name} is ${compare} ${
					first ? first : '...'
				}${second && compare === 'between' ? ` and ${second}` : ''}"`}</div>
			)}
		</div>
	);
}
