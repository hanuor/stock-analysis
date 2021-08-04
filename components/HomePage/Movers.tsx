import { StockLink } from 'components/Links';

const cellStyles =
	'py-1.5 sm:py-2 px-2 sm:px-3 xl:px-4 text-sm sm:text-base border-gray-200';

interface Mover {
	s: string;
	n: string;
	p: string;
	c: string;
}

interface Props {
	date: string;
	marketStatus: string;
	gainers: Mover[];
	losers: Mover[];
}

export const Movers = ({ date, marketStatus, gainers, losers }: Props) => {
	interface InnerProps {
		movers: Mover[];
		type: string;
	}

	const Rows = ({ movers, type }: InnerProps) => {
		const items = movers.slice(0, 10);
		const redOrGreen = type === 'Gainers' ? 'text-green-700' : 'text-red-600';

		return (
			<>
				{items.map((item, index) => (
					<tr
						key={index}
						className="border-b border-gray-200 hover:bg-gray-50 transition duration-100"
					>
						<td className={cellStyles + ' text-left border-r'}>
							<StockLink symbol={item.s} />
						</td>
						<td
							className={
								cellStyles +
								' text-left border-r max-w-[90px] xs:max-w-[170px] md:max-w-[350px] xl:whitespace-nowrap overflow-hidden overflow-ellipsis'
							}
						>
							{item.n}
						</td>

						<td className={cellStyles + ' text-right border-r'}>
							${item.p}
						</td>
						<td className={cellStyles + ' text-right ' + redOrGreen}>
							{item.c}
						</td>
					</tr>
				))}
			</>
		);
	};

	const Table = ({ movers, type }: InnerProps) => {
		const titlePrefix = marketStatus === 'premarket' ? 'Pre-Market' : 'Top';

		return (
			<div className="flex-grow">
				<div className="flex flex-row justify-between items-end mb-1">
					<h2 className="text-lg xs:text-xl bp:text-2xl font-bold mb-0.5 bp:mb-1">
						{titlePrefix} {type}
					</h2>
					<span className="text-xs xs:text-sm text-gray-600">
						Updated {date}
					</span>
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
			<section className="mx-auto flex flex-col lg:flex-row lg:justify-evenly space-y-7 px-3 xs:px-4 sm:px-5 py-7 lg:py-10 lg:max-w-[1200px] lg:space-y-0 lg:space-x-14">
				<Table movers={gainers} type="Gainers" />
				<Table movers={losers} type="Losers" />
			</section>
		</>
	);
};
