const CalendarTableMin = ({ upcoming }) => {
	return (
		<table>
			<thead>
				<th>Date</th>
				<th>Symbol</th>
				<th>Name</th>
			</thead>
			<tbody>
				{upcoming.map((item, index) => (
					<tr key={index}>
						<td>{item.date}</td>
						<td>{item.symbol}</td>
						<td>{item.name}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default CalendarTableMin;
