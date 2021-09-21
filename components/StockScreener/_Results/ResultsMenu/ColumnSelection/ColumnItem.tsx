import { FilterId } from 'components/StockScreener/screener.types';
import { useModifyColumns } from 'components/StockScreener/functions/useModifyColumns';

type Props = {
	name: string;
	id: FilterId;
};

/**
 * A checkbox that activates/deactivates a custom column for the screener results table
 * @return {JSX.Element}
 * TODO styling
 * TODO order the active columns at the top
 */
export function ColumnItem({ name, id }: Props): JSX.Element {
	const { fetchColumn, toggle, isShowing } = useModifyColumns();

	return (
		<div className="flex items-center">
			<input
				type="checkbox"
				id={id}
				checked={isShowing(id)}
				onChange={() => toggle(id)}
				onMouseEnter={() => fetchColumn(id)}
				className="focus:ring-blue-500 h-4 w-4 text-blue-600 border border-gray-500 rounded"
			/>
			<label htmlFor={id} className="ml-2 text-gray-800">
				{name}
			</label>
		</div>
	);
}
