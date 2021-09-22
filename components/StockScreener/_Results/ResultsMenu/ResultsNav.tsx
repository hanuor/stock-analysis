import { ResultsMenuItem } from 'components/StockScreener/_Results/ResultsMenu/ResultsMenuItem';

export function ResultsNav() {
	return (
		<nav className="flex-grow py-3 lg:py-0">
			<ul className="flex flex-row items-center whitespace-nowrap space-x-1 text-base">
				<ResultsMenuItem name="General" />
				<ResultsMenuItem name="Filtered" />
				<ResultsMenuItem name="Company" />
				<ResultsMenuItem name="Financials" />
				<ResultsMenuItem name="Valuation" />
				<ResultsMenuItem name="Dividends" />
				<ResultsMenuItem name="Analysts" />
			</ul>
		</nav>
	);
}
