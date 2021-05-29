export default function LatestNews({ news }) {
	return (
		<>
			<section>
				<div>
					<h2>Market News</h2>
					<table>
						<tbody>
							{news.map((item, index) => {
								return (
									<tr key={index}>
										<td>{item.d}</td>
										<td>
											<a
												href={item.u}
												target="_blank"
												rel="nofollow noopener noreferrer">
												{item.t} - {item.n}
											</a>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</section>
		</>
	);
}
