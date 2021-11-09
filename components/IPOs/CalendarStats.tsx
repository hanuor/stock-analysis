import { IpoCounts } from 'types/Ipos';

export function CalendarStats({ counts }: { counts: IpoCounts }) {
	const total =
		counts.thisweek + counts.nextweek + counts.later + counts.unscheduled;

	const hasLater = counts.later > 0;

	return (
		<div className="">
			<h3 className="hh3">Calendar Statistics</h3>
			<div
				className={`border py-4 rounded text-sm font-medium text-gray-600${
					hasLater ? ' px-6' : ' px-2'
				}`}
			>
				<div
					className={`${
						hasLater
							? 'flex flex-wrap justify-around lg:justify-between gap-x-6 gap-y-4 text-center'
							: 'grid grid-cols-2 text-center gap-y-4'
					}`}
				>
					<div className="flex flex-col">
						<div className="order-2">This Week</div>
						<div className="order-1 font-semibold text-4xl text-gray-800">
							{counts.thisweek}
						</div>
					</div>
					<div className="flex flex-col">
						<div className="order-2">Next Week</div>
						<div className="order-1 font-semibold text-4xl text-gray-800">
							{counts.nextweek}
						</div>
					</div>
					{hasLater && (
						<div className="flex flex-col">
							<div className="order-2">Later</div>
							<div className="order-1 font-semibold text-4xl text-gray-800">
								{counts.later}
							</div>
						</div>
					)}
					<div className="flex flex-col">
						<div className="order-2">Unscheduled</div>
						<div className="order-1 font-semibold text-4xl text-gray-800">
							{counts.unscheduled}
						</div>
					</div>
					<div className="flex flex-col">
						<div className="order-2">Total</div>
						<div className="order-1 font-semibold text-4xl text-gray-800">
							{total}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
