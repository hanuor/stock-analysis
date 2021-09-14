import { CalendarData } from 'types/Ipos';

export function CalendarStats({ data }: { data: CalendarData }) {
	const total =
		data.thisweek.length +
		data.nextweek.length +
		data.later.length +
		data.unknown.length;

	const count = 'font-semibold text-4xl text-gray-800';

	return (
		<div>
			<h3 className="hh3">Calendar Statistics</h3>
			<div className="border px-6 py-4 rounded text-sm font-medium text-gray-600">
				<div className="flex flex-wrap justify-around lg:justify-between gap-x-6 gap-y-4 text-center">
					<div>
						<div className={count}>{data.thisweek.length}</div>
						This Week
					</div>
					<div>
						<div className={count}>{data.nextweek.length}</div>
						Next Week
					</div>
					{data.later?.length && (
						<div>
							<div className={count}>{data.later.length}</div>
							Later
						</div>
					)}
					<div>
						<div className={count}>{data.unknown.length}</div>
						Unscheduled
					</div>
					<div>
						<div className={count}>{total}</div>
						Total Upcoming
					</div>
				</div>
			</div>
		</div>
	);
}
