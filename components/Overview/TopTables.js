import { stockState } from '@State/stockState';

const css_table = 'text-small w-[48%] lg:w-full text-gray-900';
const css_rows =
	'flex flex-col sm:table-row border-b border-gray-200 py-1 sm:py-0';
const css_cells = 'py-[1px] sm:py-2 px-1 whitespace-nowrap';
const css_cell_left = css_cells;
const css_cell_right =
	css_cells + ' text-left sm:text-right text-base sm:text-small font-semibold';

export function InfoTable() {
	const data = stockState((state) => state.data);

	return (
		<table className={css_table}>
			<tbody>
				<tr className={css_rows}>
					<td className={css_cell_left}>Market Cap</td>
					<td className={css_cell_right}>{data.marketCap}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Revenue</td>
					<td className={css_cell_right}>{data.revenue}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Net Income</td>
					<td className={css_cell_right}>{data.netIncome}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Shares Out</td>
					<td className={css_cell_right}>{data.sharesOut}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>EPS (ttm)</td>
					<td className={css_cell_right}>{data.eps}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>PE Ratio</td>
					<td className={css_cell_right}>{data.peRatio}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Forward PE</td>
					<td className={css_cell_right}>{data.forwardPE}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Dividend</td>
					<td className={css_cell_right}>{data.dividend}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Ex-Dividend Date</td>
					<td className={css_cell_right}>{data.exDividendDate}</td>
				</tr>
			</tbody>
		</table>
	);
}

export function QuoteTable() {
	const data = stockState((state) => state.data);
	const quote = stockState((state) => state.quote);

	const quoteUsed = quote ? quote.volume : data.volume;

	return (
		<table className={css_table}>
			<tbody>
				<tr className={css_rows}>
					<td className={css_cell_left}>Volume</td>
					<td className={css_cell_right}>{quoteUsed}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Open</td>
					<td className={css_cell_right}>{data.open}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Previous Close</td>
					<td className={css_cell_right}>{data.close}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Day&apos;s Range</td>
					<td className={css_cell_right}>{data.rangeDay}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>52-Week Range</td>
					<td className={css_cell_right}>{data.range52w}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Beta</td>
					<td className={css_cell_right}>{data.beta}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Analysts</td>
					<td className={css_cell_right}>{data.analysts}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Price Target</td>
					<td className={css_cell_right}>{data.target}</td>
				</tr>
				<tr className={css_rows}>
					<td className={css_cell_left}>Est. Earnings Date</td>
					<td className={css_cell_right}>{data.earningsDate}</td>
				</tr>
			</tbody>
		</table>
	);
}
