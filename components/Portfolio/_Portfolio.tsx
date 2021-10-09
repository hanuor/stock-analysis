import { PortfolioTable } from 'components/Portfolio/PortfolioTable';

export function Portfolio() {
	return (
		<>
			<h1 className="hh1">Portfolio</h1>
			<input
				className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block max-w-[100px] text-sm border border-gray-300 rounded p-1 mb-1"
				placeholder="Add symbol"
			/>
			<PortfolioTable />
		</>
	);
}
