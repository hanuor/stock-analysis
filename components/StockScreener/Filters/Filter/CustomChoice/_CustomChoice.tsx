import { screenerState } from 'components/StockScreener/screener.state';
import { SelectComparison } from './SelectComparison';
import { isFilterSelected } from 'components/StockScreener/functions/isFilterSelected';
import { ColumnId } from 'components/StockScreener/screener.types';
import { useEffect, useState } from 'react';
import { getFilterFromString } from 'components/StockScreener/functions/filters/getFilterFromString';

type Props = {
	columnId: ColumnId;
	name: string;
};

export function CustomChoice({ columnId, name }: Props) {
	const [compare, setCompare] = useState('over');
	const [first, setFirst] = useState<number>();
	const [second, setSecond] = useState<number>();
	const [equal, setEqual] = useState(true);
	const filters = screenerState((state) => state.filters);
	const active = isFilterSelected(columnId, filters);

	useEffect(() => {
		if (active) {
			const { compareValue, firstValue, secondValue, equalValue } =
				getFilterFromString(active);
			setCompare(compareValue);
			setFirst(firstValue);
			setSecond(secondValue);
			setEqual(equalValue);
		}
	}, [filters, active, compare]);

	if (columnId !== 'pe') {
		return null;
	}

	return (
		<div className="border-b border-gray-200 p-1 text-sm">
			<div className="flex items-center space-x-1">
				<div>
					<SelectComparison compare={compare} setCompare={setCompare} />
				</div>
				<input
					type="text"
					placeholder="Value"
					value={first}
					tabIndex={0}
					className="shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm block border-gray-300 rounded-sm p-1 max-w-[4rem]"
				/>
				<div>&</div>
				<input
					type="text"
					placeholder="Value"
					value={second}
					tabIndex={0}
					className="shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm block border-gray-300 rounded-sm p-1 max-w-[4rem]"
				/>
			</div>
			<div className="flex">
				<div>{'>'}</div>
				<div>{`${name} is ${compare} than`}</div>
			</div>
			<div className="flex">
				<div>
					<input type="checkbox" id="equals" checked={equal} />
					<label htmlFor="equals">include equal match</label>
				</div>
			</div>
		</div>
	);
}
