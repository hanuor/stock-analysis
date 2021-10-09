import { screenerState } from 'components/StockScreener/screener.state';
import { FilterId } from 'components/StockScreener/screener.types';
import { useModifyColumns } from 'components/StockScreener/functions/useModifyColumns';

type Props = {
	name: string;
	id: FilterId;
	type: string;
};

/**
 * A checkbox that activates/deactivates a custom column for the screener results table
 * @return {JSX.Element}
 */
export function ColumnItem({ name, id, type }: Props): JSX.Element {
	const { fetchColumn, toggle, isShowing } = useModifyColumns();
	const setOpen = screenerState((state) => state.setColumnDropdownOpen);
	let screenerType = '';
	type == 'stock'
		? (screenerType = 'screener')
		: (screenerType = 'iposcreener');

	function handleKeyDown(e: React.KeyboardEvent) {
		if (e.key === 'Enter') toggle(id, screenerType);
		if (e.key === 'Escape') setOpen(false);
	}

	return (
		<div className="flex items-center">
			<input
				type="checkbox"
				id={id}
				checked={isShowing(id)}
				onChange={() => toggle(id, screenerType)}
				onMouseEnter={() => fetchColumn(id, screenerType)}
				onFocus={() => fetchColumn(id, screenerType)}
				onKeyDown={handleKeyDown}
				className="focus:ring-blue-500 h-4 w-4 text-blue-600 border border-gray-500 rounded"
			/>
			<label htmlFor={id} className="ml-2 text-gray-800">
				{name}
			</label>
		</div>
	);
}
