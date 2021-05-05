import styles from "@/Styles/Table.module.css";

export default function Table(props) {

	function TableHeaders(props) {
		/* if (props.headers) {
			return (<thead><tr>
				{props.headers.map((header) => {
					{ header }
				})}
			</tr></thead>);
		} */
		return (<thead>
			<tr>
				<th>Symbol</th>
				<th>Company Name</th>
			</tr>
		</thead>);
	}

	return (
		<table className={styles.tableGray}>
			<TableHeaders />
			<tbody>
				{props.children}
			</tbody>
		</table>
	);
}