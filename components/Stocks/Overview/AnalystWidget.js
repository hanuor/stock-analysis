import { Bar } from 'react-chartjs-2';
import { stockState } from '@State/stockState';

function PriceTarget({ target }) {
	let priceTarget = target[0];
	let difference = target[1];
	let updown = target[2];

	if (updown === 'upside') {
		return (
			<>
				<div className="text-green-700 text-4xl text-center font-semibold mb-1">
					{priceTarget}
				</div>
				<div className="text-xl text-center mb-1">
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

	if (!data.analystChart) {
		return <h1>Loading...</h1>;
	}

	const ratings = data.analystChart;

	return (
		<div>
			<h2 className="text-2xl font-bold mb-2">Analyst Forecast</h2>
			{data.analystIntro && <p className="mb-5">{data.analystIntro}</p>}
			<div className="border border-gray-200 p-2">
				<div className="text-center m-auto text-xl font-semibold mb-2">
					Price Target
				</div>

				<PriceTarget target={data.analystTarget} />
				<div className="text-center text-lg font-semibold py-1">
					Analyst Consensus: <AnalystConsensus consensus={data.analysts} />
				</div>

				<div>
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
									grid: {
										display: false,
									},
								},
								y: {
									position: 'right',
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
