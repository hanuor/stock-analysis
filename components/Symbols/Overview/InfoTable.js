const css_table = "text-sm";
const css_rows = "border-b border-gray-200";
const css_cell_left = "py-2 px-1 border-b-1 border-gray-900";
const css_cell_right = "py-2 px-1 text-right font-semibold";

export default function InfoTable() {
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
