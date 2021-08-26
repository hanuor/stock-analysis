import { Overview } from 'types/Overview';
import { AnalystWidgetChart } from './AnalystWidgetChart';

function PriceTarget({ target }: { target: string[] }) {
	const priceTarget = target[0];
	const difference = target[1];
	const updown = target[2];

	if (updown === 'upside') {
		return (
			<>
				<div className="text-green-700 text-4xl text-center font-semibold mb-0.5">
					{priceTarget}
				</div>
				<div className="text-xl text-center mb-1.5">
					({difference} upside)
				</div>
			</>
		);
	} else if (updown === 'downside') {
		return (
			<>
				<div className="text-red-600 text-4xl text-center font-semibold mb-0.5">
					{priceTarget}
				</div>
				<div className="text-xl text-center mb-1.5">
					({difference} downside)
				</div>
			</>
		);
	} else {
		return (
			<div className="text-gray-800 text-4xl text-center font-semibold mb-0.5">
				{priceTarget}
			</div>
		);
	}
}

function AnalystConsensus({ consensus }: { consensus: string }) {
	switch (consensus) {
		case 'Buy':
		case 'Strong Buy':
			return <span className="text-green-700 font-bold">{consensus}</span>;

		case 'Underweight':
		case 'Sell':
			return <span className="text-red-600 font-bold">{consensus}</span>;

		default:
			return <span className="text-gray-800 font-bold">{consensus}</span>;
	}
}

export const AnalystWidget = ({ data }: { data: Overview }) => {
	if (
		typeof data.analystTarget === 'undefined' ||
		data.analystTarget[0] === '$0' ||
		data.analysts === 'n/a'
	) {
		return null;
	}

	const ratings = data.analystChart;

	return (
		<div>
			<h2 className="hh2 mb-2">Analyst Forecast</h2>
			{data.analystIntro && (
				<p className="mb-4 text-gray-900">{data.analystIntro}</p>
			)}
			<div className="border border-gray-200 p-2 xs:p-3">
				<div className="text-center m-auto text-xl font-semibold mb-2 text-gray-900">
					Price Target
				</div>

				<PriceTarget target={data.analystTarget} />
				<div className="text-center text-lg font-semibold py-1 text-gray-900">
					Analyst Consensus: <AnalystConsensus consensus={data.analysts} />
				</div>

				<div className="h-48">
					<AnalystWidgetChart ratings={ratings} />
				</div>
			</div>
		</div>
	);
};
