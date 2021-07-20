import 'regenerator-runtime/runtime';
import { useState } from 'react';
import { FilterValue } from 'react-table';

interface Props {
	useAsyncDebounce: (value: any, wait: number) => any;
	globalFilter: any;
	setGlobalFilter: (filterValue: FilterValue) => void;
}

export const GlobalFilter = ({
	useAsyncDebounce,
	globalFilter,
	setGlobalFilter,
}: Props) => {
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value: any) => {
		setGlobalFilter(value || undefined);
	}, 100);

	return (
		<input
			className="shadow-sm outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full text-sm xs:text-base border border-gray-300 rounded-md py-1.5 sm:py-2 pl-2 pr-1 xs:px-3"
			value={value || ''}
			onChange={(e) => {
				setValue(e.target.value);
				onChange(e.target.value);
			}}
			placeholder="Filter..."
		/>
	);
};
