import { screenerDataState } from '../../screenerdata.state';
import { FiltersMap } from 'components/StockScreener/maps/filters.map';
import {
	PresetFilter,
	PresetFiltersStocks,
	PresetFiltersIpos,
} from '../../maps/presetFilters.map';
import { useModifyFilters } from '../../functions/useModifyFilters';
import { useModifyColumns } from '../../functions/useModifyColumns';
import { screenerState } from '../../screener.state';
import { useEffect, useState } from 'react';
import { SaveFiltersButton } from './SaveButton';

export function SavedFilters() {
	const [usePreset, setUsePreset] = useState<PresetFilter[]>();
	const type = screenerDataState((state) => state.type);
	const setFilterMenu = screenerState((state) => state.setFilterMenu);
	const { add, clear } = useModifyFilters();
	const { fetchColumn } = useModifyColumns();

	useEffect(() => {
		if (type === 'stock') {
			setUsePreset(PresetFiltersStocks);
		} else if (type === 'ipo') {
			setUsePreset(PresetFiltersIpos);
		}
	}, [type]);

	function renderPresetFilters(value: string) {
		clear();
		setFilterMenu('Active');
		usePreset?.map((item) => {
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

	return (
		<div>
			<label
				htmlFor="location"
				className="hidden md:block text-sm font-medium text-gray-700"
			>
				Saved Screens
			</label>
			<div className="flex space-x-1">
				<select
					id="location"
					name="location"
					className="block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:ring-0 focus:ring-blue-500 focus:border-blue-500 rounded-md"
					defaultValue="Select saved"
					onChange={(e) => renderPresetFilters(e.target.value)}
				>
					<option value="Select screen">Select saved</option>
					{usePreset?.map((item) => (
						<option key={item.name} value={item.name}>
							{item.name}
						</option>
					))}
				</select>
				<SaveFiltersButton />
			</div>
		</div>
	);
}
