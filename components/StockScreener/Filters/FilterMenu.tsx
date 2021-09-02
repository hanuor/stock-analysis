export function StockScreenerFilterMenu() {
	return (
		<>
			<div className="flex border-t border-b border-gray-200 bg-gray-50 py-1 px-3 overflow-x-auto">
				<h3 className="font-semibold mr-5">Filters</h3>
				<div className="mx-auto">
					<ul className="flex space-x-4">
						<li>General</li>
						<li>Financials</li>
						<li>Valuation</li>
						<li>Technicals</li>
						<li>Other</li>
						<li>All</li>
					</ul>
				</div>
			</div>
		</>
	);
}
