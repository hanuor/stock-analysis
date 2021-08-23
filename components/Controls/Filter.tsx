export function Filter() {
	return (
		<div>
			<label htmlFor="filter" className="sr-only">
				Filter results
			</label>
			<input
				type="text"
				name="filter"
				id="filter"
				className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
				placeholder="Filter..."
			/>
		</div>
	);
}
