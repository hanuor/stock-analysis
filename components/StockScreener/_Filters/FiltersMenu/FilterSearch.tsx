import { screenerState } from 'components/StockScreener/screener.state';
import { CloseInput } from 'components/CloseInput';

export function FilterSearch() {
	const search = screenerState((state) => state.filterSearch);
	const setSearch = screenerState((state) => state.setFilterSearch);

	return (
		<div className="relative flex items-center">
			<input
				type="text"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				className="w-full lg:w-[170px] shadow-sm focus:ring-0 focus:ring-blue-500 focus:border-blue-500 block text-sm border-gray-300 rounded-md mb-1"
				placeholder="Find filter..."
			/>
			<CloseInput search={search} setSearch={setSearch} />
		</div>
	);
}
