import { useMemo } from "react";
import { useTable } from "react-table";
import styles from "@/Styles/Table.module.css";
import { financialsState } from "@State/financialsState";

export default function FinancialTable(props) {
	const range = financialsState((state) => state.range);
	// A react table needs "columns" and "data"
	// The useMemo stores the function output in memory so that it is only re-computed when the dependencies change
	const columns = useMemo(() => props.columns, [range]);
	const data = useMemo(() => props.children, [range]);

	const tableInstance = useTable({ columns, data });

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		tableInstance;

	return (
		<table
			{...getTableProps()}
			className={[
				styles.table,
				styles.table_striped,
				styles.table_financial,
			].join(" ")}>
			<thead>
				{headerGroups.map((headerGroup) => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column) => (
							<th {...column.getHeaderProps()}>
								{column.render("Header")}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map((cell) => {
								return (
									<td {...cell.getCellProps()}>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
