const css_table = "text-sm";
const css_rows = "border-b border-gray-200";
const css_cell_left = "py-2 px-1 border-b-1 border-gray-900";
const css_cell_right = "py-2 px-1 text-right font-semibold";

export function InfoTable() {
	return (
		<div>
			<table className={css_table}>
				<tbody>
					<tr className={css_rows}>
						<td className={css_cell_left}>Market Cap</td>
						<td className={css_cell_right}>2.17T</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Revenue</td>
						<td className={css_cell_right}>325.41B</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Net Income</td>
						<td className={css_cell_right}>76.31B</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Shares Out</td>
						<td className={css_cell_right}>16.75B</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>EPS (ttm)</td>
						<td className={css_cell_right}>4.45</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>PE Ratio</td>
						<td className={css_cell_right}>29.27</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Forward PE</td>
						<td className={css_cell_right}>26.32</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Dividend</td>
						<td className={css_cell_right}>$0.82 (0.63%)</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Est. Ex-Dividend</td>
						<td className={css_cell_right}>Jun 1, 2021</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export function QuoteTable() {
	return (
		<div>
			<table className={css_table}>
				<tbody>
					<tr className={css_rows}>
						<td className={css_cell_left}>Volume</td>
						<td className={css_cell_right}>78,973,273</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Open</td>
						<td className={css_cell_right}>$130.89</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Previous Close</td>
						<td className={css_cell_right}>$129.52</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Day's Range</td>
						<td className={css_cell_right}>129.48 - 131.26</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>52-Week Range</td>
						<td className={css_cell_right}>74.55 - 144.63</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Beta</td>
						<td className={css_cell_right}>1.19</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Analysts</td>
						<td className={css_cell_right}>Strong Buy</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Price Target</td>
						<td className={css_cell_right}>$158.58</td>
					</tr>
					<tr className={css_rows}>
						<td className={css_cell_left}>Est. Earnings</td>
						<td className={css_cell_right}>Sep 7, 2021</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
}
