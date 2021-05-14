import { useState } from "react";

export default function HeaderSearch() {
	const [query, setQuery] = useState("");

	function handleInput(e) {
		setQuery(e.target.value);
	}

	return (
		<>
			<div className="flex relative">
				<button className="absolute inset-y-0 left-0 flex items-center pl-2">
					<svg
						className="w-5 text-gray-600 h-5"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="3"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
					</svg>
				</button>
				<input
					className="border border-gray-200 placeholder-gray-700 py-2 pl-10 flex-grow"
					name="q"
					type="text"
					spellCheck="false"
					autoComplete="off"
					title="Search"
					aria-label="Search"
					placeholder="Search this site..."
					value={query}
					onChange={handleInput}
				/>
			</div>
		</>
	);
}
