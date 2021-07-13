import StatsChart from './StatsChart';

const StatsChartMonthly = ({ title, data }) => {
	const x = data.map((month) => {
		return month[0];
	});

	const y = data.map((month) => {
		return month[1];
	});

	return <StatsChart title={title} x={x} y={y} />;
};

export default StatsChartMonthly;
