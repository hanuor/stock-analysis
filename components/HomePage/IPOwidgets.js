export default function IPOwidgets({ recent, upcoming }) {
	const IPOTable = ({ ipos }) => {
		return (
			<table>
				<thead>
					<tr>
						<th>Date</th>
						<th>Symbol</th>
						<th>Name</th>
					</tr>
				</thead>
				<tbody>
					{ipos.map((item, index) => {
						return (
							<tr key={index}>
								<td>{item.d}</td>
								<td>{item.s}</td>
								<td>{item.n}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	};

	return (
		<>
			<section>
				<div>
					<div>
						<h2>Recent IPOs</h2>
						<span>All Recent IPOs</span>
					</div>
					<IPOTable ipos={recent} />
				</div>
				<div>
					<div>
						<h2>Upcoming IPOs</h2>
						<span>IPO Calendar</span>
					</div>
					<IPOTable ipos={upcoming} />
				</div>
			</section>
		</>
	);
}
