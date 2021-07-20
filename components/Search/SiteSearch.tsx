import { useState, useEffect, useRef } from 'react';
import { SearchIcon } from 'components/Icons/Search';
import { SingleResult } from './SingleResult';
import { useRouter } from 'next/router';

interface SearchItem {
	s: string;
	n: string;
	t: string;
}

export const SiteSearch = ({ nav }: { nav: boolean }) => {
	const router = useRouter();
	const inputRef = useRef<HTMLInputElement>(null);
	const [query, setQuery] = useState('');
	const [fetched, setFetched] = useState(false);
	const [loading, setLoading] = useState(false);
	const [index, setIndex] = useState([]);
	const [results, setResults] = useState([]);
	const [open, setOpen] = useState(false);
	const [trending, setTrending] = useState([]);
	let num = 1;

	// Fetch the site index
	async function fetchIndex() {
		setFetched(true);
		if (!loading && !index.length) {
			try {
				setLoading(true);
				const resA = await fetch(
					'https://stockanalysis.com/wp-json/sa/trending/'
				);
				const trendingData = await resA.json();
				setTrending(trendingData);
				const resB = await fetch(
					'https://stockanalysis.com/wp-json/sa/search/'
				);
				const indexData = await resB.json();
				setIndex(indexData);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		}
	}

	// When the search query changes, perform a search
	useEffect(() => {
		const stopTimeout = () => {
			if (waiting) {
				clearTimeout(waiting);
			}
		};
		stopTimeout();

		let waiting: ReturnType<typeof setTimeout>;
		if (query.length) {
			waiting = setTimeout(() => {
				const keyword = query.toString().toUpperCase();

				const exact = index.filter((item: SearchItem) => {
					if (item.s && item.s === keyword) {
						return item.s;
					}
					if (item.n) {
						const name = item.n.toUpperCase();
						if (name === keyword) {
							return name;
						}
					}
					return;
				});

				const matches = index.filter((item: SearchItem) => {
					if (item.s && item.s.startsWith(keyword)) {
						if (item.s !== keyword) {
							return item.s.startsWith(keyword);
						}
					}
					if (item.n) {
						const name = item.n.toUpperCase();
						if (item.s !== keyword && name !== keyword) {
							return name.startsWith(keyword);
						}
					}
					return;
				});

				const allResults = exact.concat(matches);
				setResults(allResults);
				setOpen(true);
			}, 200);
		} else if (fetched) {
			setResults(trending);
			setOpen(true);
		}

		return () => {
			clearTimeout(waiting);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query, index]);

	function keyClick(e: KeyboardEvent) {
		const active = document.querySelector('.activeresult');

		const keyref = inputRef.current ?? null;

		switch (e.key) {
			case 'Escape':
				{
					if (keyref) {
						e.preventDefault();
						keyref.blur();
						setOpen(false);
					}
				}
				break;

			case 'ArrowDown':
				{
					e.preventDefault();
					if (num < results.length) {
						if (active) {
							active.classList.remove('activeresult');
						}
						num++;
						const next: HTMLLinkElement | null = document.querySelector(
							'[data-num="' + num + '"]'
						);
						if (next) {
							next.classList.add('activeresult');
							next.focus();
							if (keyref) {
								keyref.focus();
							}
						}
					}
				}
				break;

			case 'ArrowUp':
				{
					e.preventDefault();
					if (num > 1) {
						if (active) {
							active.classList.remove('activeresult');
						}
						num--;
						const next: HTMLLinkElement | null = document.querySelector(
							'[data-num="' + num + '"]'
						);
						if (next) {
							next.classList.add('activeresult');
							next.focus();
							if (keyref) {
								keyref.focus();
							}
						}
					}
				}
				break;

			case 'Enter':
				{
					e.preventDefault();
					const activeResult: HTMLLinkElement | null =
						document.querySelector('.activeresult') ?? null;
					if (activeResult) {
						const selected = activeResult.href;
						const selectedUrl = new URL(selected);
						const selectedPath = selectedUrl.pathname;
						setOpen(false);
						setResults([]);
						setQuery('');
						router.push(selectedPath);
					}
				}
				break;
		}
	}

	function mouseClick(e: MouseEvent) {
		const resultsref = inputRef.current ?? null;
		const resultsdoc = document.querySelector('.searchresults') ?? null;

		if (
			(resultsref && resultsref.contains(e.target as Node)) ||
			(resultsdoc && resultsdoc.contains(e.target as Node))
		) {
			return;
		}
		setOpen(false);
	}

	useEffect(() => {
		if (open) {
			document.addEventListener('keydown', keyClick);
			document.addEventListener('mousedown', mouseClick);
		} else {
			document.removeEventListener('keydown', keyClick);
			document.removeEventListener('mousedown', mouseClick);
		}

		return () => {
			document.removeEventListener('keydown', keyClick);
			document.removeEventListener('mousedown', mouseClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [open, results]);

	const grayBg = nav ? ' bg-gray-50 focus:bg-white' : '';

	return (
		<>
			<SearchIcon />
			<input
				className={
					'border border-gray-200 placeholder-gray-700 text-sm xs:text-base py-2 pl-8 xs:pl-10 flex-grow focus:ring-0 focus:border-gray-200 focus:outline-none focus:bg-white focus:shadow-lg transition' +
					grayBg
				}
				name="q"
				type="text"
				spellCheck="false"
				autoComplete="off"
				title="Search"
				aria-label="Search"
				placeholder="Company or stock ticker..."
				ref={inputRef}
				value={query}
				onClick={() => fetchIndex()}
				onChange={(e) => setQuery(e.target.value)}
				onFocus={() => {
					if (!fetched) {
						fetchIndex();
					}
					if (results.length) {
						setOpen(true);
					}
				}}
			/>
			{open && (
				<>
					<div className="max-h-60 w-full bg-white absolute top-10 border border-gray-200 overflow-y-auto shadow-lg searchresults">
						{query.length === 0 && (
							<h4 className="text-lg font-semibold py-1.5 px-2 sm:px-3">
								Trending
							</h4>
						)}
						<ul>
							{results.map((item, index) => (
								<SingleResult
									key={index}
									index={index}
									result={item}
									setOpen={setOpen}
								/>
							))}
						</ul>
					</div>
					<style global jsx>{`
						.activeresult {
							background-color: #f3f4f6;
						}
					`}</style>
				</>
			)}
		</>
	);
};
