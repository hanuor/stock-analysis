import { useState } from 'react';
import { FilterValue } from 'react-table';

interface Props {
	useAsyncDebounce: (value: any, wait: number) => any;
	globalFilter: any;
	setGlobalFilter: (filterValue: FilterValue) => void;
}

export function Filter({
	useAsyncDebounce,
	globalFilter,
	setGlobalFilter,
}: Props) {
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value: any) => {
		setGlobalFilter(value || undefined);
	}, 100);

	return (
		<div className="min-w-[80px] max-w-[100px] xs:max-w-[130px] sm:max-w-[150px]">
			<label htmlFor="filter" className="sr-only">
				Filter results
			</label>
			<input
				type="text"
				name="filter"
				id="filter"
				className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 rounded-md"
				value={value || ''}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder="Filter..."
			/>
		</div>
	);
}
