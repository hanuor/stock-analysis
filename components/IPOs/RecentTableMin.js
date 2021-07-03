import Link from 'next/link';
import Button from 'components/Button';

const CalendarTableMin = ({ recent }) => {
	return (
		<div>
			<h3 className="hh3">Latest IPOs</h3>
			<div className="border border-gray-200 rounded">
				<table className="w-full text-gray-900 text-[0.95rem]">
					<thead>
						<tr className="border-b border-gray-200">
							<th className="text-left py-2 px-2 pl-2 border-r border-gray-200">
								Date
							</th>
							<th className="text-left py-2 px-2 border-r border-gray-200">
								Symbol
							</th>
							<th className="text-left py-2 px-2 pr-2">Name</th>
						</tr>
					</thead>
					<tbody>
						{recent.map((item, index) => (
							<tr
								key={index}
								className="border-b last:border-0 border-gray-200"
							>
								<td className="py-2 px-2 pl-2 border-r border-gray-200 whitespace-nowrap">
									{item.date}
								</td>
								<td className="py-2 px-2 border-r border-gray-200">
									<Link href={`/stocks/${item.symbol.toLowerCase()}`}>
										<a className="bll">{item.symbol}</a>
									</Link>
								</td>
								<td className="py-2 px-2 pr-2 lg:max-w-[150px] lg:truncate">
									{item.name}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<Button text="All Recent IPOs" url="/ipos/" />
		</div>
	);
};

export default CalendarTableMin;
