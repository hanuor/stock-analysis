import { Overview } from 'types/Overview';
import { Quote } from 'types/Quote';

const cssTable = 'text-small w-[48%] lg:w-full text-gray-900';
const cssRows =
	'flex flex-col sm:table-row border-b border-gray-200 py-1 sm:py-0';
const cssCells = 'py-[1px] sm:py-2 px-1 whitespace-nowrap';
const cssCellLeft = cssCells;
const cssCellRight =
	cssCells + ' text-left sm:text-right text-base sm:text-small font-semibold';

export const InfoTable = ({ data }: { data: Overview }) => {
	return (
		<table className={cssTable}>
			<tbody>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Market Cap</td>
					<td className={cssCellRight}>{data.marketCap}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Revenue</td>
					<td className={cssCellRight}>{data.revenue}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Net Income</td>
					<td className={cssCellRight}>{data.netIncome}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Shares Out</td>
					<td className={cssCellRight}>{data.sharesOut}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>EPS (ttm)</td>
					<td className={cssCellRight}>{data.eps}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>PE Ratio</td>
					<td className={cssCellRight}>{data.peRatio}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Forward PE</td>
					<td className={cssCellRight}>{data.forwardPE}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Dividend</td>
					<td className={cssCellRight}>{data.dividend}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Ex-Dividend Date</td>
					<td className={cssCellRight}>{data.exDividendDate}</td>
				</tr>
			</tbody>
		</table>
	);
};

export const QuoteTable = ({
	data,
	quote,
}: {
	data: Overview;
	quote: Quote;
}) => {
	const quoteUsed = quote ? quote.volume : data.volume;

	return (
		<table className={cssTable}>
			<tbody>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Volume</td>
					<td className={cssCellRight}>{quoteUsed}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Open</td>
					<td className={cssCellRight}>{data.open}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Previous Close</td>
					<td className={cssCellRight}>{data.close}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Day&apos;s Range</td>
					<td className={cssCellRight}>{data.rangeDay}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>52-Week Range</td>
					<td className={cssCellRight}>{data.range52w}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Beta</td>
					<td className={cssCellRight}>{data.beta}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Analysts</td>
					<td className={cssCellRight}>{data.analysts}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Price Target</td>
					<td className={cssCellRight}>{data.target}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Est. Earnings Date</td>
					<td className={cssCellRight}>{data.earningsDate}</td>
				</tr>
			</tbody>
		</table>
	);
};
