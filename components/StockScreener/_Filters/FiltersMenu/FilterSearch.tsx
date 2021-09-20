import { screenerState } from 'components/StockScreener/screener.state';
import { CloseIcon } from 'components/Icons/Close';

export function FilterSearch() {
	const filterSearch = screenerState((state) => state.filterSearch);
	const setFilterSearch = screenerState((state) => state.setFilterSearch);

	return (
		<div className="relative flex items-center">
			<input
				type="text"
				value={filterSearch}
				onChange={(e) => setFilterSearch(e.target.value)}
				className="w-full lg:w-auto shadow-sm focus:ring-0 focus:ring-blue-500 focus:border-blue-500 block text-sm border-gray-300 rounded-md mb-1"
				placeholder="Find filter..."
			/>
			{filterSearch && filterSearch.length > 0 && (
				<div className="absolute right-[7px] xs:right-[10px]">
					<span
						aria-label="Clear"
						title="Clear"
						tabIndex={0}
						onClick={() => {
							setFilterSearch('');
						}}
						onKeyPress={(e) => {
							if (e.key === 'Enter') {
								setFilterSearch('');
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
