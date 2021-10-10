import { AddPortfolio } from 'components/Portfolio/AddPortfolio';
import { PortfolioListTable } from 'components/Portfolio/PortfolioListTable';

export function PortfolioList() {
	return (
		<div>
			<h1 className="hh2">All Portfolios</h1>
			<AddPortfolio />
			<PortfolioListTable />
		</div>
	);
}
