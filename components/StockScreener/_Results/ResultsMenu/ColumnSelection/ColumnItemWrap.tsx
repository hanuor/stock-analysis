/* eslint-disable react-hooks/exhaustive-deps */
import { screenerState } from 'components/StockScreener/screener.state';
import { useModifyColumns } from 'components/StockScreener/functions/useModifyColumns';
import {
	FiltersMap,
	IPOFiltersMap,
} from 'components/StockScreener/maps/filters.map';
import { FilterId } from 'components/StockScreener/screener.types';
import { ColumnItem } from './ColumnItem';
import { useMemo } from 'react';

type ColumnProperties = {
	id: FilterId;
	name: string;
};

type Props = {
	search: string;
	type: string;
};
/**
 * Wrapper that contains all the individual checkboxes to select columns for the results table
 * @param {string} search - The search term to filter the results
 * @return {JSX.Element}
 * TODO styling: scrollbar
 */
export function ColumnItemWrap({ search, type }: Props) {
	const { isShowing } = useModifyColumns();
	const columnDropdownOpen = screenerState(
		(state) => state.columnDropdownOpen
	);

	const activeArray: ColumnProperties[] = [];
	const inactiveArray: ColumnProperties[] = [];

	let filters = [];
	type == 'stock' ? (filters = FiltersMap) : (filters = IPOFiltersMap);

	filters.forEach((filter) => {
		if (isShowing(filter.id)) {
			if (search === '' || filter.name.toLowerCase().includes(search)) {
				activeArray.push({ id: filter.id, name: filter.name });
			}
		} else {
			if (search === '' || filter.name.toLowerCase().includes(search)) {
				inactiveArray.push({ id: filter.id, name: filter.name });
			}
		}
	});

	const active = useMemo(() => activeArray, [columnDropdownOpen, search]);
	const inactive = useMemo(() => inactiveArray, [columnDropdownOpen, search]);

	return (
		<div className="max-h-80 overflow-y-auto overscroll-contain thin-scroll text-sm p-2 space-y-2">
			{active.map((item) => (
				<ColumnItem
					key={item.id}
					id={item.id}
					name={item.name}
					type={type}
				/>
			))}
			{inactive.map((item) => (
				<ColumnItem
					key={item.id}
					id={item.id}
					name={item.name}
					type={type}
				/>
			))}
			{active.length === 0 && inactive.length === 0 && (
				<div>No columns found.</div>
			)}
		</div>
	);
}
