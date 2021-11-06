import { CalendarData } from 'types/Ipos';

export function CalendarStatsMobile({ data }: { data: CalendarData }) {
	const total =
		data.thisweek.length +
		data.nextweek.length +
		data.later.length +
		data.unknown.length;

	const hasLater = data.later && data.later?.length > 0;

	return (
		<div className="pt-2 pb-3 lg:hidden">
			<h2 className="text-[1.4rem] font-bold mb-1.5 text-gray-800">
				Calendar Statistics
			</h2>
			<div className="border-t border-b pt-2 pb-3 text-xs sm:text-sm font-medium text-gray-600 px-1.5">
				<div className="flex flex-row justify-between text-center">
					<div className="flex flex-col">
						<div className="order-2">This Week</div>
						<div className="order-1 font-semibold text-3xl sm:text-4xl text-gray-800">
							{data.thisweek.length}
						</div>
					</div>
					<div className="flex flex-col">
						<div className="order-2">Next Week</div>
						<div className="order-1 font-semibold text-3xl sm:text-4xl text-gray-800">
							{data.nextweek.length}
						</div>
					</div>
					{hasLater && (
						<div className="flex flex-col">
							<div className="order-2">Later</div>
							<div className="order-1 font-semibold text-3xl sm:text-4xl text-gray-800">
								{data.later.length}
							</div>
						</div>
					)}
					<div className="flex flex-col">
						<div className="order-2">Unscheduled</div>
						<div className="order-1 font-semibold text-3xl sm:text-4xl text-gray-800">
							{data.unknown.length}
						</div>
					</div>
					<div className="flex flex-col">
						<div className="order-2">Total</div>
						<div className="order-1 font-semibold text-3xl sm:text-4xl text-gray-800">
							{total}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
