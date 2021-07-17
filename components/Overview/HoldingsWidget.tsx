import { HoldingsI } from 'types/Holdings';
import { SymbolLink } from 'components/Links';
import { Button } from 'components/Button';

interface Props {
	ticker: string;
	data: HoldingsI;
}

export const HoldingsWidget = ({ ticker, data }: Props) => {
	if (data.list.length < 10) {
		return null;
	}

	return (
		<div>
			<div className="xs:flex flex-row justify-between items-end mb-2 xs:mb-1">
				<h2 className="hh2 mb-0 xs:mb-1">Top 10 Holdings</h2>
				<span className="text-smaller text-gray-800">
					{data.top10.toFixed(2) + '% of assets'}
				</span>
			</div>
			<table className="w-full text-smaller xs:text-base">
				<thead>
					<tr className="border-t border-b border-gray-200">
						<th className="text-left py-1.5 px-1.5 xs:px-2">Name</th>
						<th className="text-left py-1.5 px-1.5 xs:px-2">Symbol</th>
						<th className="text-right py-1.5 px-1.5 xs:px-2">Weight</th>
					</tr>
				</thead>
				<tbody>
					{data.list.map((item, index) => (
						<tr key={index} className="border-b border-gray-200">
							<td className="text-left py-1.5 px-1.5 xs:px-2 font-semibold">
								{item.name}
							</td>
							<td className="text-left py-1.5 px-1.5 xs:px-2">
								<SymbolLink symbol={item.symbol} />
							</td>
							<td className="text-right py-1.5 px-1.5 xs:px-2">
								{item.assets}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<style jsx>{`
				table tr th {
					background-color: #fff;
				}
				table tr:nth-child(odd) {
					background-color: #fafbfc;
				}
				table tr:hover td {
					background-color: #f2f9ff !important;
				}
			`}</style>
			<Button
				url={`/etf/${ticker.toLowerCase()}/holdings/`}
				text="View More Holdings"
				className="text-lg bp:text-xl"
			/>
		</div>
	);
};
