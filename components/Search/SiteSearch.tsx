import { useState, useEffect, useRef } from 'react';
import { SearchIcon } from 'components/Icons/Search';
import { SingleResult } from './SingleResult';
import { useRouter } from 'next/router';
import { getData } from 'functions/API';
import { CloseIcon } from 'components/Icons/Close';

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
	const [filtering, setFiltering] = useState(false);
	const [index, setIndex] = useState([]);
	const [results, setResults] = useState([]);
	const [open, setOpen] = useState(false);
	const [trending, setTrending] = useState([]);
	const [error, setError] = useState(false);
	let num = 1;

	// Fetch the site index
	async function fetchIndex() {
		setError(false);
		setFetched(true);
		if (!loading && !index.length) {
			try {
				setLoading(true);
				const trendingData = await getData('search?q=trending');
				setTrending(trendingData);
				const indexData = await getData('search?q=index');
				setIndex(indexData);
			} catch (error) {
				setError(true);
				return console.error(error);
			} finally {
				setLoading(false);
			}
		}
	}

	// When the search query changes, perform a search
	useEffect(() => {
		setFiltering(true);
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
				setFiltering(false);
			}, 150);
		} else if (fetched) {
			setResults(trending);
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
			case 'Tab':
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
					const activeResult: HTMLLinkElement | null =
						document.querySelector('.activeresult') ?? null;
					if (activeResult) {
						e.preventDefault();
						const selected = activeResult.href;
						const selectedUrl = new URL(selected);
						const selectedPath = selectedUrl.pathname;
						router.push(selectedPath);
						setOpen(false);
						if (keyref) {
							keyref.blur();
						}
					}
				}
				break;
		}
	}

	function mouseClick(e: MouseEvent) {
		const formref = inputRef.current ?? null;
		const resultsdoc = document.querySelector('.searchresults') ?? null;

		if (
			(formref && formref.contains(e.target as Node)) ||
			(resultsdoc && resultsdoc.contains(e.target as Node))
		) {
			return;
		}
		setOpen(false);
	}

	function clearInput(e: any) {
		e.preventDefault();
		setQuery('');
		const keyref = inputRef.current ?? null;
		if (keyref) {
			keyref.focus();
		}
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

	return (
		<>
			<SearchIcon />
			<input
				className={`border border-gray-200 placeholder-gray-700 text-sm xs:text-base py-2 pl-7 tiny:pl-8 xs:pl-10 flex-grow focus:ring-0 focus:border-gray-200 focus:outline-none hover:bg-white focus:bg-white focus:shadow-lg rounded-sm ${
					nav ? 'bg-gray-50 focus:bg-white' : 'lg:text-[17px]'
				}`}
				type="text"
				aria-label="Search"
				role="combobox"
				aria-expanded={open}
				aria-controls="owned_listbox"
				autoComplete="off"
				spellCheck="false"
				aria-autocomplete="list"
				name="q"
				placeholder="Company or stock symbol..."
				ref={inputRef}
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				onMouseEnter={() => {
					!fetched && fetchIndex();
				}}
				onClick={() => {
					!fetched && fetchIndex();
				}}
				onFocus={() => {
					setOpen(true);
					!fetched && fetchIndex();
				}}
			/>
			{query && query.length > 0 && (
				<div className="absolute right-[7px] xs:right-[10px]">
					<span
						aria-label="Clear"
						title="Clear"
						tabIndex={0}
						onClick={clearInput}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								clearInput(e);
							}
						}}
					>
						<CloseIcon classes="h-4 w-4 xs:h-5 xs:w-5 text-gray-600 hover:text-blue-500" />
					</span>
				</div>
			)}
			<div className={`dropd ${open ? 'active' : 'inactive'}`}>
				{open && !error && (
					<>
						<div className="searchresults">
							{!loading && query.length === 0 && (
								<h4 className="text-lg font-semibold py-1.5 px-2 sm:px-3">
									Trending
								</h4>
							)}
							{results.length ? (
								<ul role="listbox" id="owned_listbox">
									{results.map((item, index) => (
										<SingleResult
											key={index}
											index={index}
											result={item}
											setOpen={setOpen}
										/>
									))}
								</ul>
							) : (
								!loading &&
								!filtering && (
									<h4 className="text-lg font-semibold py-1.5 px-2 sm:px-3">
										No results found.
									</h4>
								)
							)}
						</div>
						<style global jsx>{`
							.activeresult {
								background-color: #f3f4f6;
							}
						`}</style>
					</>
				)}
			</div>
		</>
	);
};
