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

	function handleKeyPress(e: React.KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSelection(option.name, option.value);
		}
		if (e.key === 'Escape') {
			e.preventDefault();
			setOpenFilter('');
		}
	}

	return (
		<div className="border-b border-gray-100 last:border-0">
			<div
				className="block px-4 py-2 text-sm text-gray-700 focus:outline-none hover:bg-gray-100 focus:bg-blue-100 hover:text-gray-900 focus:text-gray-900 cursor-default"
				onClick={() => handleSelection(option.name, option.value)}
				onKeyDown={(e) => handleKeyPress(e)}
				tabIndex={0}
			>
				{option.name}
			</div>
		</div>
	);
}
