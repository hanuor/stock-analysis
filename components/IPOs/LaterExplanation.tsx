import { Information } from 'components/Alerts/Information';

export function LaterExplanation() {
	return (
		<div className="pb-1 lg:pb-0">
			<h2 className="hh2 text-[1.4rem] text-gray-800 mb-4">
				After Next Week
			</h2>
			<Information
				message="No IPO dates have been set after next week. The reason is that IPO dates are rarely scheduled more than 7-10 days in advance."
				classes="text-base sm:text-[1.05rem] text-blue-800 mb-1"
			/>
		</div>
	);
}
