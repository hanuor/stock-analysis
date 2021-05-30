import Link from 'next/link';

const cellStyles =
	'py-1.5 sm:py-2 px-2 sm:px-3 xl:px-4 text-sm sm:text-base border-gray-200';

export default function Movers({ data }) {
	const gainers = data.gainers;
	const losers = data.losers;
	const date = data.date;
	const marketStatus = data.marketStatus;

	const Rows = ({ movers, type }) => {
		let items = movers.slice(0, 10);
		let redOrGreen = type === 'Gainers' ? 'text-green-600' : 'text-red-500';

		return items.map((item, index) => (
			<tr
				key={index}
				className="border-b border-gray-200 hover:bg-gray-50 transition duration-100">
				<td className={cellStyles + ' text-left border-r'}>
					<Link href={`/stocks/${item.s.toLowerCase()}`}>
						<a className="text-blue-brand hover:text-black">{item.s}</a>
					</Link>
				</td>
				<td
					className={
						cellStyles +
						' text-left border-r max-w-[90px] xs:max-w-[170px] md:max-w-[350px] xl:whitespace-nowrap overflow-hidden overflow-ellipsis'
					}>
					{item.n}
				</td>

				<td className={cellStyles + ' text-right border-r'}>{item.p}</td>
				<td className={cellStyles + ' text-right ' + redOrGreen}>
					{item.c}
				</td>
			</tr>
		));
	};

	const Table = ({ movers, type }) => {
		let titlePrefix = marketStatus === 'pre-market' ? 'Pre-Market' : 'Top';

		return (
			<div className="flex-grow">
				<div className="flex flex-row justify-between items-end mb-1">
					<h2 className="text-2xl font-bold mb-1">
						{titlePrefix} {type}
					</h2>
					<span className="text-sm text-gray-600">Updated {date}</span>
				</div>
				<table className="border border-gray-200 w-full">
					<thead>
						<tr className="border-t border-b border-gray-200">
							<th className={cellStyles + ' text-left border-r'}>
								Symbol
							</th>
							<th className={cellStyles + ' text-left border-r'}>
								Name
							</th>
							<th className={cellStyles + ' text-right border-r'}>
								Price
							</th>
							<th className={cellStyles + ' text-right'}>Change</th>
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
			<section className="mx-auto flex flex-col lg:flex-row lg:justify-evenly space-y-7 px-3 xs:px-4 sm:px-5 py-7 lg:py-12 lg:max-w-[1200px] lg:space-y-0 lg:space-x-14">
				<Table movers={gainers} type="Gainers" />
				<Table movers={losers} type="Losers" />
			</section>
		</>
	);
}
