import { ResultsMenuItem } from 'components/StockScreener/_Results/ResultsMenuItem';

export function ResultsMenu() {
	return (
		<>
			<div className="border-b-[2px] mt-5 border-blue-brand_sharp flex items-end whitespace-nowrap">
				<h3 className="text-xl font-semibold ml-1 mb-2 mr-5">Analyze</h3>
				<nav>
					<ul className="navmenu">
						<ResultsMenuItem name="Filtered" />
						<ResultsMenuItem name="General" />
						<ResultsMenuItem name="Company" />
						<ResultsMenuItem name="Financials" />
						<ResultsMenuItem name="Valuation" />
						<ResultsMenuItem name="Dividends" />
						<ResultsMenuItem name="Analysts" />
						<ResultsMenuItem name="Custom" />
					</ul>
				</nav>
			</div>
		</>
	);
}
