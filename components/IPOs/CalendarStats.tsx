import { CalendarData } from 'types/Ipos';

export function CalendarStats({ data }: { data: CalendarData }) {
	const total =
		data.thisweek.length +
		data.nextweek.length +
		data.later.length +
		data.unknown.length;

	const count = 'font-semibold text-lg bp:text-xl sm:text-3xl text-gray-800';

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
