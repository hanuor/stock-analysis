import { useModifyFilters } from 'components/StockScreener/functions/useModifyFilters';
import { screenerState } from 'components/StockScreener/screener.state';
import {
	FilterOption,
	FilterProps,
} from 'components/StockScreener/screener.types';

type Props = {
	option: FilterOption;
	filter: FilterProps;
	active: string | false;
};

export function PresetChoice({ option, filter, active }: Props) {
	const setOpenFilter = screenerState((state) => state.setOpenFilter);
	const { id, filterType, numberType } = filter;
	const { add } = useModifyFilters();

	function handleSelection(name: string, value: string) {
		if (id) {
			// Add the new filter
			add(id, name, value, filterType, numberType);

			// Close the dropdown
			setOpenFilter('');
		}
	}

	return (
		<div className="border-b border-gray-100 last:border-0">
			<div
				className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-default"
				onClick={() => handleSelection(option.name, option.value)}
			>
				{option.name}
			</div>
		</div>
	);
}
