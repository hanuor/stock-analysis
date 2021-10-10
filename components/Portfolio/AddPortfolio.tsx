import { useState } from 'react';
import { useEditSymbols } from './useEditSymbols';

export function AddPortfolio() {
	const { add } = useEditSymbols();
	const [value, setValue] = useState('');

	async function handleSubmit(value: string) {
		add.mutate(value);
		setValue('');
	}

	return (
		<input
			className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block max-w-[100px] text-sm border border-gray-300 rounded p-1 mb-1"
			placeholder="Add symbol"
			value={value}
			onChange={(e) => setValue(e.target.value)}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleSubmit(value);
				}
			}}
		/>
	);
}
