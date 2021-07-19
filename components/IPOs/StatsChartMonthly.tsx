import { StatsChart } from './StatsChart';

interface Props {
	title: string;
	data: [string, number][];
}

export const StatsChartMonthly = ({ title, data }: Props) => {
	const x = data.map((month) => {
		return month[0];
	});

	const y = data.map((month) => {
		return month[1];
	});

	return <StatsChart title={title} x={x} y={y} />;
};
