import { getData } from 'functions/API';
import { useDebounce } from 'hooks/useDebounce';
import { useEffect, useState } from 'react';
import { News } from 'types/News';

type Props = {
	id: number;
	setData: (data: News[]) => void;
};

export function NewsMenuSearch({ id, setData }: Props) {
	const [query, setQuery] = useState('');
	const debounced = useDebounce(query, 500);

	useEffect(() => {
		async function doSearch() {
			const results = await getData(`news-search?i=${id}&q=${query}`);
			console.log(results);
			if (results.status === 'success') {
				setData(results.data);
			}
		}

		if (debounced) {
			doSearch();
		}
	}, [debounced, id, query, setData]);

	return (
		<div className="mb-1">
			<input
				className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 rounded-md"
				type="text"
				name="newssearch"
				id="newssearch"
				placeholder="Search news..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
		</div>
	);
}
