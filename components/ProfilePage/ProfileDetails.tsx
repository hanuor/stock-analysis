import { StockDetails } from 'types/Company';

export const ProfileDetails = ({ details }: { details: StockDetails }) => {
	return (
		<>
			<h2 className="hh2 mt-6 xs:mt-8">Stock Details</h2>
			<div className="bg-gray-50 px-2 xs:px-4 pt-2 xs:pt-2.5 pb-2 border border-gray-200 rounded">
				<table className="w-full detailstable">
					<tbody>
						{details.symbol && (
							<tr>
								<td className="py-2 px-2 font-semibold">
									Ticker Symbol
								</td>
								<td className="py-2 px-2 text-right">
									{details.symbol}
								</td>
							</tr>
						)}
						{details.exchange && (
							<tr>
								<td className="py-2 px-2 font-semibold">Exchange</td>
								<td className="py-2 px-2 text-right">
									{details.exchange}
								</td>
							</tr>
						)}
						{details.fiscalYear && (
							<tr>
								<td className="py-2 px-2 font-semibold">Fiscal Year</td>
								<td className="py-2 px-2 text-right">
									{details.fiscalYear}
								</td>
							</tr>
						)}
						{details.currency && (
							<tr>
								<td className="py-2 px-2 font-semibold">
									Reporting Currency
								</td>
								<td className="py-2 px-2 text-right">
									{details.currency}
								</td>
							</tr>
						)}
						{details.ipoPrice && (
							<tr>
								<td className="py-2 px-2 font-semibold">IPO Price</td>
								<td className="py-2 px-2 text-right">
									{details.ipoPrice}
								</td>
							</tr>
						)}
						{details.cik && (
							<tr>
								<td className="py-2 px-2 font-semibold">CIK Code</td>
								<td className="py-2 px-2 text-right">{details.cik}</td>
							</tr>
						)}
						{details.cusip && (
							<tr>
								<td className="py-2 px-2 font-semibold">
									CUSIP Number
								</td>
								<td className="py-2 px-2 text-right">
									{details.cusip}
								</td>
							</tr>
						)}
						{details.isin && (
							<tr>
								<td className="py-2 px-2 font-semibold">ISIN Number</td>
								<td className="py-2 px-2 text-right">{details.isin}</td>
							</tr>
						)}
						{details.eid && (
							<tr>
								<td className="py-2 px-2 font-semibold">Employer ID</td>
								<td className="py-2 px-2 text-right">{details.eid}</td>
							</tr>
						)}
					</tbody>
				</table>
				<style global jsx>{`
					table.detailstable tr:not(:last-child) {
						border-bottom: 1px solid #ddd;
					}
				`}</style>
			</div>
		</>
	);
};
