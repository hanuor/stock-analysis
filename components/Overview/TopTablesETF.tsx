import { Overview } from 'types/Overview';
import { Quote } from 'types/Quote';

const cssRows =
	'flex flex-col sm:table-row border-b border-gray-200 py-1 sm:py-0';
const cssCells = 'py-[1px] sm:py-2 px-1 whitespace-nowrap';
const cssCellLeft = cssCells;
const cssCellRight =
	cssCells + ' text-left sm:text-right text-base sm:text-small font-semibold';

export const InfoTable = ({ data }: { data: Overview }) => {
	return (
		<table className="text-small w-[48%] lg:w-auto text-gray-900">
			<tbody>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Assets</td>
					<td className={cssCellRight}>{data.assets}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>NAV</td>
					<td className={cssCellRight}>{data.nav}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Expense Ratio</td>
					<td className={cssCellRight}>{data.er}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>PE Ratio</td>
					<td className={cssCellRight}>{data.peRatio}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Shares Out</td>
					<td className={cssCellRight}>{data.sharesOut}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Dividend (ttm)</td>
					<td className={cssCellRight}>{data.dividend}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Dividend Yield</td>
					<td className={cssCellRight}>{data.dividendYield}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Ex-Dividend Date</td>
					<td className={cssCellRight}>{data.exDividendDate}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>1-Year Return</td>
					<td className={cssCellRight}>{data.change1y}</td>
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
		<table className="text-small w-[48%] lg:w-auto text-gray-900">
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
					<td className={cssCellLeft}>52-Week Low</td>
					<td className={cssCellRight}>{data.low52}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>52-Week High</td>
					<td className={cssCellRight}>{data.high52}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Beta</td>
					<td className={cssCellRight}>{data.beta}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Holdings</td>
					<td className={cssCellRight}>{data.holdings}</td>
				</tr>
				<tr className={cssRows}>
					<td className={cssCellLeft}>Inception Date</td>
					<td className={cssCellRight}>{data.inception}</td>
				</tr>
			</tbody>
		</table>
	);
};
