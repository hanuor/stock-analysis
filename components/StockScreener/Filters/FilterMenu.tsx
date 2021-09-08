export function FilterMenu() {
	return (
		<>
			<div className="flex border-t border-b border-gray-200 bg-gray-50 py-1 px-3 overflow-x-auto">
				<h3 className="font-semibold mr-5">Filter</h3>
				<div className="mx-auto">
					<ul className="flex space-x-4">
						<li>
							<strong>General</strong>
						</li>
						<li>Company</li>
						<li>Financials</li>
						<li>Valuation</li>
						<li>Dividends</li>
						<li>Analysts</li>
						<li>Technicals</li>
						<li>Other</li>
						<li>All</li>
					</ul>
				</div>
			</div>
		</>
	);
}
