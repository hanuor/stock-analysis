import { ResultsMenuItem } from 'components/StockScreener/Results/ResultsMenuItem';

export function ResultsMenu() {
	return (
		<>
			<div className="flex items-center border-t border-b border-gray-200 bg-gray-50 px-3 overflow-x-auto">
				<h3 className="font-semibold mr-5">Analyze</h3>
				<div className="mx-auto">
					<ul className="flex space-x-2 filter-menu">
						<ResultsMenuItem name="Filtered" />
						<ResultsMenuItem name="General" />
						<ResultsMenuItem name="Company" />
						<ResultsMenuItem name="Financials" />
						<ResultsMenuItem name="Valuation" />
						<ResultsMenuItem name="Dividends" />
						<ResultsMenuItem name="Analysts" />
						<ResultsMenuItem name="Custom" />
					</ul>
				</div>
			</div>
		</>
	);
}
