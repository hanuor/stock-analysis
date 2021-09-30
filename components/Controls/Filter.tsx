import { useState, useEffect } from 'react';
import { FilterValue } from 'react-table';
import { CloseIcon } from 'components/Icons/Close';

interface Props {
	useAsyncDebounce: (value: any, wait: number) => any;
	globalFilter: any;
	setGlobalFilter: (filterValue: FilterValue) => void;
	filterText?: string;
}

export function Filter({
	useAsyncDebounce,
	globalFilter,
	setGlobalFilter,
	filterText = 'Filter...',
}: Props) {
	const [value, setValue] = useState(globalFilter);
	const onChange = useAsyncDebounce((value: any) => {
		setGlobalFilter(value || undefined);
	}, 100);

	useEffect(() => {
		if (value) onChange(value);
	}, [onChange, value]);

	return (
		<div className="min-w-[80px] max-w-[100px] xs:max-w-[130px] sm:max-w-[150px] relative flex items-center">
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
				placeholder={filterText}
			/>
			{globalFilter && globalFilter.length > 0 && (
				<div className="absolute right-[7px] xs:right-[10px]">
					<span
						aria-label="Clear"
						title="Clear"
						tabIndex={0}
						onClick={() => {
							setValue('');
							onChange('');
						}}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								setValue('');
								onChange('');
							}
						}}
					>
						<CloseIcon classes="h-4 w-4 xs:h-4 xs:w-5 text-gray-600 hover:text-blue-500" />
					</span>
				</div>
			)}
		</div>
	);
}
