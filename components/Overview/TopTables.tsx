import { useQuote } from 'hooks/useQuote';
import { Info } from 'types/Info';
import { Overview } from 'types/Overview';

export const InfoTable = ({ data }: { data: Overview }) => {
	return (
		<table className="top-table">
			<tbody>
				<tr>
					<td>Market Cap</td>
					<td>{data.marketCap}</td>
				</tr>
				<tr>
					<td>Revenue (ttm)</td>
					<td>{data.revenue}</td>
				</tr>
				<tr>
					<td>Net Income (ttm)</td>
					<td>{data.netIncome}</td>
				</tr>
				<tr>
					<td>Shares Out</td>
					<td>{data.sharesOut}</td>
				</tr>
				<tr>
					<td>EPS (ttm)</td>
					<td>{data.eps}</td>
				</tr>
				<tr>
					<td>PE Ratio</td>
					<td>{data.peRatio}</td>
				</tr>
				<tr>
					<td>Forward PE</td>
					<td>{data.forwardPE}</td>
				</tr>
				<tr>
					<td>Dividend</td>
					<td>{data.dividend}</td>
				</tr>
				<tr>
					<td>Ex-Dividend Date</td>
					<td>{data.exDividendDate}</td>
				</tr>
			</tbody>
		</table>
	);
};

export const QuoteTable = ({ data, info }: { data: Overview; info: Info }) => {
	const q = useQuote(info);

	let previous = 'Previous Close';
	if (info.ipoDate && q.td === info.ipoDate) previous = 'IPO Price';

	return (
		<table className="top-table">
			<tbody>
				<tr>
					<td>Volume</td>
					<td>{q.v || 'n/a'}</td>
				</tr>
				<tr>
					<td>Open</td>
					<td>{q.o || 'n/a'}</td>
				</tr>
				<tr>
					<td>{previous}</td>
					<td>{q.cl || 'n/a'}</td>
				</tr>
				<tr>
					<td>Day&apos;s Range</td>
					<td>{q.l && q.h ? q.l + ' - ' + q.h : 'n/a'}</td>
				</tr>
				<tr>
					<td>52-Week Range</td>
					<td>{q.l52 && q.h52 ? q.l52 + ' - ' + q.h52 : 'n/a'}</td>
				</tr>
				<tr>
					<td>Beta</td>
					<td>{data.beta}</td>
				</tr>
				<tr>
					<td>Analysts</td>
					<td>{data.analysts}</td>
				</tr>
				<tr>
					<td>Price Target</td>
					<td>{data.target}</td>
				</tr>
				<tr>
					<td>Earnings Date</td>
					<td>{data.earningsDate}</td>
				</tr>
			</tbody>
		</table>
	);
};
