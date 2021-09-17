import {
	FilterOption,
	FilterProps,
} from 'components/StockScreener/screener.types';
import { useEffect, useState } from 'react';
import { PresetChoice } from '../PresetChoice';

type Props = {
	filter: FilterProps;
	active: string | false;
};

export function StringFilter({ filter, active }: Props) {
	const [search, setSearch] = useState('');
	const [options, setOptions] = useState<FilterOption[]>(filter.options);

	const type = filter.filterType;
	const count = filter.options.length;

	useEffect(() => {
		if (type === 'stringmatch') {
			if (search.length > 0) {
				const filtered = filter.options.filter((option) =>
					option.name.toLowerCase().includes(search.toLowerCase())
				);
				setOptions(filtered);
			} else {
				setOptions(filter.options);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, type]);

	useEffect(() => {
		if (type === 'stringmatch') {
			if (!active) {
				setSearch('');
				setOptions(filter.options);
			}
		}
	}, [active, filter.options, type]);

	return (
		<div className="py-1">
			{count > 6 && type === 'stringmatch' && (
				<input
					type="text"
					className="border-0 border-b border-gray-200 w-full focus:ring-0 focus:border-gray-200"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			)}
			<div className="max-h-[400px] overflow-y-auto overflow-x-hidden overscroll-contain">
				{options &&
					options.map((option) => (
						<PresetChoice
							key={option.value}
							option={option}
							filter={filter}
							active={active}
						/>
					))}
			</div>
		</div>
	);
}
