import Link from 'next/link';

export default function IPOwidgets({ recent, upcoming }) {
	const IPOTable = ({ ipos }) => {
		return (
			<table className="w-full border border-gray-200 text-sm sm:text-base">
				<thead>
					<tr className="border-b border-t border-gray-200">
						<th className="py-1.5 px-2 text-left border-r border-gray-200">
							Date
						</th>
						<th className="py-1.5 px-2 text-left border-r border-gray-200">
							Symbol
						</th>
						<th className="py-1.5 px-2 text-left">Name</th>
					</tr>
				</thead>
				<tbody>
					{ipos.map((item, index) => {
						return (
							<tr
								key={index}
								className="border-b border-gray-200 hover:bg-gray-50">
								<td className="py-1.5 px-2 border-r border-gray-200 whitespace-nowrap">
									{item.d}
								</td>
								<td className="py-1.5 px-2 border-r border-gray-200">
									<Link href={`/stocks/${item.s.toLowerCase()}`}>
										<a className="link">{item.s}</a>
									</Link>
								</td>
								<td className="py-1.5 px-2">{item.n}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	};

	return (
		<>
			<div className="flex flex-col space-y-6">
				<section className="px-3 xs:px-4 sm:px-5">
					<div className="flex flex-row justify-between items-end mb-1">
						<h2 className="text-2xl font-bold mb-1">Recent IPOs</h2>
						<span>
							<Link href="/ipos/">
								<a className="link">All Recent IPOs</a>
							</Link>
						</span>
					</div>
					<IPOTable ipos={recent} />
				</section>
				<section className="px-3 xs:px-4 sm:px-5">
					<div className="flex flex-row justify-between items-end mb-1">
						<h2 className="text-2xl font-bold mb-1">Upcoming IPOs</h2>
						<span>
							<Link href="/ipos/calendar/">
								<a className="link">IPO Calendar</a>
							</Link>
						</span>
					</div>
					<IPOTable ipos={upcoming} />
				</section>
			</div>
		</>
	);
}
