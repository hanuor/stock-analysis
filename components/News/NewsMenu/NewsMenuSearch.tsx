import { SearchIcon } from '@heroicons/react/solid';
import { SpinnerIcon } from 'components/Icons/Spinner';
import { getData } from 'functions/API';
import { useEffect, useRef, useState } from 'react';
import { News } from 'types/News';

type Props = {
	id: number;
	setData: (data: News[]) => void;
	news: News[];
	setError: (error: string) => void;
	setLoaded: (loaded: boolean) => void;
	query: string;
	setQuery: (query: string) => void;
	searched: boolean;
	setSearched: (searched: boolean) => void;
	setEnd: (end: boolean) => void;
};

export function NewsMenuSearch({
	id,
	setData,
	news,
	setError,
	setLoaded,
	query,
	setQuery,
	searched,
	setSearched,
	setEnd,
}: Props) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [searching, setSearching] = useState(false); // If a search is in progress

	async function doSearch() {
		setSearching(true);
		const keyref = inputRef.current ?? null;
		if (keyref) keyref.blur();
		const results = await getData(`news-search?i=${id}&q=${query}`);
		setSearching(false);
		setSearched(true);
		setLoaded(true);
		setEnd(false);
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
	}, [query, news, setData, searched, setSearched]);

	return (
		<div className="mb-1 relative max-w-[50%] sm:max-w-[170px]">
			<input
				ref={inputRef}
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
