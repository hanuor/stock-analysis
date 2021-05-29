import Link from 'next/link';

export default function Movers({ data }) {
	const gainers = data.gainers;
	const losers = data.losers;
	const date = data.date;
	const marketStatus = data.marketStatus;

	const Rows = ({ movers, type }) => {
		let items = movers.slice(0, 10);
		let changeStyles = type === 'Gainers' ? 'text-green-600' : 'text-red-500';

		return items.map((item, index) => (
			<tr
				key={index}
				className="border-b border-gray-200 hover:bg-gray-50 transition duration-100">
				<td className="py-2 px-3 text-left border-r border-gray-200">
					<Link href={`/stocks/${item.s.toLowerCase()}`}>
						<a className="text-blue-brand hover:text-black">{item.s}</a>
					</Link>
				</td>
				<td className="py-2 px-3 text-left border-r border-gray-200 max-w-[250px] whitespace-nowrap overflow-hidden overflow-ellipsis">
					{item.n}
				</td>

				<td className="py-2 px-3 text-right border-r border-gray-200">
					{item.p}
				</td>
				<td className={'py-2 px-3 text-right ' + changeStyles}>{item.c}</td>
			</tr>
		));
	};

	const Table = ({ movers, type }) => {
		let titlePrefix = marketStatus === 'pre-market' ? 'Pre-Market' : 'Top';

		return (
			<div>
				<div className="flex flex-row justify-between items-end mb-1">
					<h2 className="text-2xl font-bold mb-1">
						{titlePrefix} {type}
					</h2>
					<span className="text-sm text-gray-600">Updated {date}</span>
				</div>
				<table className="border border-gray-200">
					<thead>
						<tr className="border-t border-b border-gray-200">
							<th className="py-2 px-3 text-left border-r border-gray-200">
								Symbol
							</th>
							<th className="py-2 px-3 text-left border-r border-gray-200">
								Name
							</th>
							<th className="py-2 px-3 text-right border-r border-gray-200">
								Price
							</th>
							<th className="py-2 px-3 text-right">Change</th>
						</tr>
					</thead>
					<tbody>
						<Rows movers={movers} type={type} />
					</tbody>
				</table>
			</div>
		);
	};

	return (
		<>
			<section className="md:max-w-screen-lg mx-auto md:flex md:flex-row justify-center py-12 md:space-x-14">
				<Table movers={gainers} type="Gainers" />
				<Table movers={losers} type="Losers" />
			</section>
		</>
	);
}
