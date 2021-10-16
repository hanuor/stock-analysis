import { DividendChartDataType } from 'types/Dividend';
import { useEffect, useState } from 'react';
import { SingleChart } from './SingleChart';

interface Props {
	data: DividendChartDataType;
	options: {
		growth: boolean;
		trailing: boolean;
	};
	ticker: string;
}

// Count how many data points are not zero, hide dividend growth chart if 0-1 data points
function countNotZero(yData: Number[]) {
	let count = 0;
	yData.forEach((y) => {
		if (y !== 0) {
			count++;
		}
	});
	return count;
}

export const DividendChart = ({ data, options, ticker }: Props) => {
	const [active, setActive] = useState('all');
	const [y1, setY1] = useState<number[]>([]);
	const [y2, setY2] = useState<number[]>([]);

	useEffect(() => {
		setY1(data.amount);
		setY2(data.growth);
	}, [data.amount, data.growth]);

	const setAll = () => {
		setActive('all');
		setY1(data.amount);
		setY2(data.growth);
	};

	const setTrailing = () => {
		setActive('trailing');
		setY1(data.ttm);
		setY2(data.growthTTM);
	};

	if (data === null || data.amount.length === 0) {
		return null;
	}

	return (
		<>
			<div className="flex flex-row justify-between items-end mb-1">
				<h2 className="hh2 mb-1 sm:mb-2 mt-6">Dividend Charts</h2>
				{options.trailing && data.amount.length > 1 && (
					<div className="flex flex-row space-x-2">
						<span
							onClick={() => setAll()}
							className={
								active === 'all'
									? 'text-gray-900'
									: 'bll cursor-pointer'
							}
						>
							All
						</span>
						<span
							onClick={() => setTrailing()}
							className={
								active === 'trailing'
									? 'text-gray-900'
									: 'bll cursor-pointer'
							}
						>
							Trailing
						</span>
					</div>
				)}
			</div>
			<div className="space-y-7">
				<SingleChart
					xdata={data.date}
					ydata={y1}
					type="amount"
					title={
						active === 'trailing'
							? `${ticker} Dividends (ttm)`
							: `${ticker} Dividends`
					}
				/>
				{countNotZero(y2) > 1 && (
					<SingleChart
						xdata={data.date}
						ydata={y2}
						type="percentage"
						title={
							active === 'trailing'
								? `${ticker} Dividend Growth (TTM YoY)`
								: `${ticker} Dividend Growth (YoY)`
						}
					/>
				)}
			</div>
		</>
	);
};
