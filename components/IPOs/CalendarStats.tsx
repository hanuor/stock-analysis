import { CalendarData } from 'types/Ipos';

export function CalendarStats({ data }: { data: CalendarData }) {
	const total =
		data.thisweek.length +
		data.nextweek.length +
		data.later.length +
		data.unknown.length;

	const title = 'text-lg';
	const count = 'font-semibold text-lg bp:text-xl sm:text-3xl text-gray-800';

	const stats = [
		{ name: 'Today', stat: '4' },
		{ name: 'This Week', stat: '17' },
		{ name: 'Next Week', stat: '6' },
		{ name: 'Later', stat: '2' },
		{ name: 'Unscheduled', stat: '371' },
		{ name: 'Total', stat: '402' },
	];

	// return (
	// 	<div>
	// 		<h2 className="hh2 text-gray-800 text-[1.4rem]">
	// 			Calendar Statistics
	// 		</h2>
	// 		<dl className="mt-5 grid grid-cols-2 gap-5 sm:grid-cols-3">
	// 			{stats.map((item) => (
	// 				<div
	// 					key={item.name}
	// 					className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
	// 				>
	// 					<dt className="text-sm font-medium text-gray-500 truncate">
	// 						{item.name}
	// 					</dt>
	// 					<dd className="mt-1 text-3xl font-semibold text-gray-900">
	// 						{item.stat}
	// 					</dd>
	// 				</div>
	// 			))}
	// 		</dl>
	// 	</div>
	// );

	return (
		<div>
			{/* <h2 className="hh2 text-[1.4rem] text-gray-800">
				Calendar Statistics
			</h2> */}
			<div className="border p-4 rounded-sm text-base font-medium text-gray-600">
				<div className="flex justify-between">
					{/* <div>
						Today
						<div className={count}>3</div>
					</div> */}
					<div>
						This Week
						<div className={count}>{data.thisweek.length}</div>
					</div>
					<div>
						Next Week
						<div className={count}>{data.nextweek.length}</div>
					</div>
					{data.later?.length && (
						<div>
							Later
							<div className={count}>{data.later.length}</div>
						</div>
					)}
					<div>
						Unscheduled
						<div className={count}>{data.unknown.length}</div>
					</div>
					<div>
						Total Pending
						<div className={count}>{total}</div>
					</div>
				</div>
			</div>
		</div>
	);
}
