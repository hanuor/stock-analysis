import { Button } from 'components/Button';
import { Info } from 'types/Info';
import { Overview } from 'types/Overview';
import { FinancialsWidgetChart } from './FinancialsWidgetChart';

interface Props {
	info: Info;
	data: Overview;
}

export const FinancialsWidget = ({ info, data }: Props) => {
	if (!data || !data.financialChart) {
		return null;
	}

	const earnings: number[] = data.financialChart[2];
	const colors: string[] = [];

	earnings.map(function (item) {
		if (item < 0) {
			colors.push('#CD5C5C');
		} else {
			colors.push('#00853E');
		}
	});

	// https://stackoverflow.com/questions/42585861/chart-js-increase-spacing-between-legend-and-chart/67723827#67723827?newreg=566b25835b7d46818559b7301d5ead2f
	const padLegend = {
		id: 'padLegend',

		beforeInit: (chart: { legend: { fit: () => void; height: number } }) => {
			const originalFit = chart.legend.fit;

			chart.legend.fit = function fit() {
				originalFit.bind(chart.legend)();
				chart.legend.height += 6;
			};
		},
	};

	const colorEarnings = {
		id: 'colorEarnings',

		beforeDraw: function (chart: { legend: { legendItems: any } }) {
			if (earnings[earnings.length - 1] > 0) {
				const legends = chart.legend.legendItems;
				legends[legends.length - 1].fillStyle = '#00853E';
			} else {
				const legends = chart.legend.legendItems;
				legends[legends.length - 1].fillStyle = '#CD5C5C';
			}
		},
	};

	return (
		<div>
			<h2 className="hh2 mb-2">Financial Performance</h2>
			{data.financialIntro && (
				<p className="mb-3 text-gray-900">{data.financialIntro}</p>
			)}
			<div className="h-72 border border-gray-200 rounded-sm p-1 xs:px-2 bp:px-3">
				<FinancialsWidgetChart
					data={data}
					colors={colors}
					padLegend={padLegend}
					colorEarnings={colorEarnings}
				/>
			</div>
			{info.currency !== 'USD' && (
				<span className="text-small text-gray-700">
					Financial numbers in millions {info.currency}
				</span>
			)}

			<Button
				url={`/stocks/${info.symbol}/financials/`}
				text="Financial Statements"
			/>
		</div>
	);
};
