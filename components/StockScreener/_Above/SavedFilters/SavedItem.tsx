import { FiltersMap } from 'components/StockScreener/maps/filters.map';
import { useModifyFilters } from '../../functions/useModifyFilters';
import { useModifyColumns } from '../../functions/useModifyColumns';
import { screenerState } from '../../screener.state';
import { useSavedScreens } from './useSavedScreens';
import { FilterId } from 'components/StockScreener/screener.types';
import { XIcon } from '@heroicons/react/solid';

type SavedFilter = {
	id: FilterId;
	name: string;
	value: string;
};

type Screen = {
	name: string;
	id: number;
	filters: SavedFilter[];
};

type Props = {
	name: string;
	type: 'stocks' | 'ipo';
};

export function SavedItem({ name, type }: Props) {
	const { data, del } = useSavedScreens(type);
	const setFilterMenu = screenerState((state) => state.setFilterMenu);
	const { add, clear } = useModifyFilters();
	const { fetchColumn } = useModifyColumns();

	function renderPresetFilters(value: string) {
		clear();
		setFilterMenu('Active');
		data.map((item: Screen) => {
			if (item.name === value) {
				item.filters.map((filter) => {
					FiltersMap.map((mapItem) => {
						if (mapItem.id === filter.id) {
							add(
								filter.id,
								mapItem.name,
								filter.value,
								mapItem.filterType,
								mapItem.numberType
							);
							fetchColumn(filter.id, type);
						}
					});
				});
			}
		});
	}

	async function handleDelete(name: string) {
		del.mutate(name);
	}

	return (
		<div className="w-full flex justify-between hover:bg-gray-50">
			<div
				className="py-2 pl-2 pr-5 block cursor-pointer hover:font-medium focus:font-medium"
				onClick={() => renderPresetFilters(name)}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						renderPresetFilters(name);
					}
				}}
				tabIndex={0}
			>
				{name}
			</div>
			<div
				className="flex items-center p-1 pr-2 text-gray-500 hover:text-red-500 cursor-pointer"
				title="Delete"
				onClick={() => handleDelete(name)}
			>
				<XIcon className="w-4 h-4" />
			</div>
		</div>
	);
}
