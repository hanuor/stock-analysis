import { ResultsMenuItem } from 'components/StockScreener/_Results/ResultsMenu/ResultsMenuItem';
import { ColumnDropdown } from './ColumnSelection/ColumnDropdown';

export function ResultsMenu() {
	return (
		<>
			<div className="border-b-[2px] mt-5 border-blue-brand_sharp flex justify-between items-end whitespace-nowrap overflow-x-auto lg:overflow-visible">
				<h3 className="text-xl font-semibold ml-1 mb-2 w-[100px]">
					Analyze
				</h3>
				<nav>
					<ul className="navmenu">
						{/* <ResultsMenuItem name="Filtered" /> */}
						<ResultsMenuItem name="General" />
						<ResultsMenuItem name="Filtered" />
						<ResultsMenuItem name="Company" />
						<ResultsMenuItem name="Financials" />
						<ResultsMenuItem name="Valuation" />
						<ResultsMenuItem name="Dividends" />
						<ResultsMenuItem name="Analysts" />
					</ul>
				</nav>
				<div className="mb-1">
					<ColumnDropdown />
				</div>
			</div>
		</>
	);
}
