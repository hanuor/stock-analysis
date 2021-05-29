import { useState, useEffect, useRef } from 'react';
import SearchIcon from './SearchIcon';
import SingleResult from './SingleResult';
import Axios from 'axios';
import { useRouter } from 'next/router';

export default function SiteSearch({ nav }) {
	const router = useRouter();
	const inputRef = useRef();
	const [query, setQuery] = useState('');
	const [fetched, setFetched] = useState(false);
	const [loading, setLoading] = useState(false);
	const [index, setIndex] = useState([]);
	const [results, setResults] = useState([]);
	const [open, setOpen] = useState(false);
	const [wait, setWait] = useState();
	const [trending, setTrending] = useState([]);
	let num = 1;

	// Fetch the site index
	async function fetchIndex() {
		setFetched(true);
		if (!loading && !index.length) {
			try {
				setLoading(true);
				const trendingJSON = await Axios.get('/api/trending/');
				setTrending(trendingJSON.data);
				const indexJSON = await Axios.get('/api/search/');
				setIndex(indexJSON.data);
			} catch (e) {
				console.log('There was a problem');
			} finally {
				setLoading(false);
			}
		}
	}

	// When the search query changes, perform a search
	useEffect(() => {
		clearTimeout(wait);

		if (query.length) {
			setWait(
				setTimeout(() => {
					let keyword = query.toString().toUpperCase();

					let exact = index.filter((item) => {
						if (item.s && item.s === keyword) {
							return item.s;
						}
						if (item.n) {
							let name = item.n.toUpperCase();
							if (name === keyword) {
								return name;
							}
						}
					});

					let matches = index.filter((item) => {
						if (item.s && item.s.startsWith(keyword)) {
							if (item.s !== keyword) {
								return item.s.startsWith(keyword);
							}
						}
						if (item.n) {
							let name = item.n.toUpperCase();
							if (item.s !== keyword && name !== keyword) {
								return name.startsWith(keyword);
							}
						}
					});

					const allResults = exact.concat(matches);
					setResults(allResults);
					setOpen(true);
				}, 200)
			);
		} else if (fetched) {
			setResults(trending);
			setOpen(true);
		}

		return () => {
			clearTimeout(wait);
		};
	}, [query, index]);

	function keyClick(e) {
		let active = document.querySelector('.activeresult');

		switch (e.key) {
			case 'Escape':
				{
					if (inputRef) {
						e.preventDefault();
						inputRef.current.blur();
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
						let next = document.querySelector('[data-num="' + num + '"]');
						if (next) {
							next.classList.add('activeresult');
							next.focus();
							inputRef.current.focus();
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
						let next = document.querySelector('[data-num="' + num + '"]');
						if (next) {
							next.classList.add('activeresult');
							next.focus();
							inputRef.current.focus();
						}
					}
				}
				break;

			case 'Enter':
				{
					e.preventDefault();
					let selected = document.querySelector('.activeresult').href;
					let selectedUrl = new URL(selected);
					let selectedPath = selectedUrl.pathname;
					setOpen(false);
					setResults([]);
					setQuery('');
					router.push(selectedPath);
				}
				break;
		}
	}

	function mouseClick(e) {
		if (
			(inputRef.current && inputRef.current.contains(e.target)) ||
			(document.querySelector('.searchresults') &&
				document.querySelector('.searchresults').contains(e.target))
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
	}, [open, results]);

	const grayBg = nav ? ' bg-gray-50 focus:bg-white' : '';

	return (
		<>
			<SearchIcon />
			<input
				className={
					'border border-gray-200 placeholder-gray-700 py-2 pl-10 flex-grow focus:outline-none focus:bg-white focus:shadow-lg transition' +
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
									symbol={item.s}
									name={item.n}
									type={item.t}
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
}
