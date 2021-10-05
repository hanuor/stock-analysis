import { SearchIcon } from '@heroicons/react/solid';
import { SpinnerIcon } from 'components/Icons/Spinner';
import { getData } from 'functions/API';
import { useEffect, useState } from 'react';
import { News } from 'types/News';

type Props = {
	id: number;
	setData: (data: News[]) => void;
	news: News[];
	setError: (error: string) => void;
};

export function NewsMenuSearch({ id, setData, news, setError }: Props) {
	const [query, setQuery] = useState('');
	const [searched, setSearched] = useState(false); // If a search has been performed
	const [searching, setSearching] = useState(false); // If

	async function doSearch() {
		setSearching(true);
		const results = await getData(`news-search?i=${id}&q=${query}`);
		setSearching(false);
		setSearched(true);
		console.log(results);
		if (results.status === 'success') {
			setData(results.data);
		} else if (results.status === 'notfound') {
			setError(`No results found for "${query}"`);
		} else if (results.status === 'error') {
			setError(`There was an error.`);
		}
	}

	useEffect(() => {
		if (query === '' && searched) {
			setData(news);
			setSearched(false);
		}
	}, [query, news, setData, searched]);

	return (
		<div className="mb-1 relative">
			<input
				className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full text-sm border-gray-300 rounded-md pr-9"
				type="text"
				name="newssearch"
				id="newssearch"
				placeholder="Search news..."
				value={query}
				onChange={(e) => {
					setError('');
					setQuery(e.target.value);
				}}
				onKeyDown={(e) => e.key === 'Enter' && !searching && doSearch()}
			/>
			<div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
				{searching ? (
					<SpinnerIcon classes="animate-spin h-5 w-5 text-gray-400" />
				) : (
					<SearchIcon
						className="h-5 w-5 text-gray-400"
						aria-hidden="true"
					/>
				)}
			</div>
		</div>
	);
}
