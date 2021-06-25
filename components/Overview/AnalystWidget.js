import { Bar, defaults } from 'react-chartjs-2';
import { stockState } from '@State/stockState';

defaults.font.family =
	"system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'";
defaults.color = '#222222';

function PriceTarget({ target }) {
	let priceTarget = target[0];
	let difference = target[1];
	let updown = target[2];

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
				<div className="text-red-600">{priceTarget}</div>
				<div>({difference} downside)</div>
			</>
		);
	} else {
		return <div className="text-gray-800">{priceTarget}</div>;
	}
}

function AnalystConsensus({ consensus }) {
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

export default function AnalystWidget() {
	const data = stockState((state) => state.data);

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
					<Bar
						data={{
							labels: [
								'Sell',
								'Underweight',
								'Hold',
								'Buy',
								'Strong Buy',
							],
							datasets: [
								{
									label: 'Analysts',
									data: [
										ratings.strongsell,
										ratings.sell,
										ratings.hold,
										ratings.buy,
										ratings.strongbuy,
									],
									backgroundColor: [
										'#FF3333',
										'#FF3333',
										'#323232',
										'#0B610B',
										'#0B610B',
									],
								},
							],
						}}
						options={{
							maintainAspectRatio: false,
							scales: {
								x: {
									ticks: {
										font: {
											size: 14,
										},
									},
									grid: {
										display: false,
									},
								},
								y: {
									position: 'right',
									ticks: {
										font: {
											size: 14,
										},
										padding: 0,
									},
									grid: {
										drawBorder: false,
									},
								},
							},
							plugins: {
								legend: {
									display: false,
								},
							},
						}}
					/>
				</div>
			</div>
		</div>
	);
}
