import Link from 'next/link';

export default function LatestNews({ news }) {
	return (
		<>
			<section className="mx-auto px-3 xs:px-4 sm:px-5 lg:col-span-2">
				<h2 className="text-2xl font-bold">Market News</h2>
				<table className="text-sm sm:text-base">
					<tbody>
						{news.map((item, index) => {
							return (
								<tr
									key={index}
									className="border-b border-gray-200 hover:bg-gray-50">
									<td className="pr-1 pt-2 align-top text-gray-600">
										{item.d}
									</td>
									<td className="pl-2 py-2">
										<a
											href={item.u}
											target="_blank"
											rel="nofollow noopener noreferrer"
											className="link">
											{item.t}
										</a>
										<span className="text-gray-600"> - {item.n}</span>
									</td>
								</tr>
							);
						})}
						<tr className="border-b border-gray-200 hover:bg-gray-50">
							<td
								colSpan="2"
								className="pl-2 py-2 text-lg font-semibold">
								<Link href="/news/">
									<a className="link">More stock market news</a>
								</Link>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
		</>
	);
}
