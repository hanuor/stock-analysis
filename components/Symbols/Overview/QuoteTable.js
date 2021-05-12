const css_table = "text-sm";
const css_rows = "border-b border-gray-200";
const css_cell_left = "py-2 px-1 border-b-1 border-gray-900";
const css_cell_right = "py-2 px-1 text-right font-semibold";

export default function QuoteTable({ info }) {
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
