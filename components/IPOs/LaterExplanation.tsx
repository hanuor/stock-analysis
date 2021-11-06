import { InfoBox } from 'components/InfoBox';

export function LaterExplanation() {
	return (
		<div className="pb-1 lg:pb-0">
			<h2 className="hh2 text-[1.4rem] text-gray-800 mb-4">
				After Next Week
			</h2>
			<InfoBox
				text="No IPOs have been scheduled after next week. The reason is that IPO
				dates are rarely set more than 7-10 days in advance."
			/>
		</div>
	);
}
