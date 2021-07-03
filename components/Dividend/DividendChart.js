import stockState from 'state/stockState';
import { useEffect, useState } from 'react';
import SingleChart from './SingleChart';

const DividendChart = ({ data, options }) => {
	const info = stockState((state) => state.info);
	const [active, setActive] = useState('all');
	const [y1, setY1] = useState([]);
	const [y2, setY2] = useState([]);

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
				{options.trailing && (
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
							? `${info.ticker} Dividends (ttm)`
							: `${info.ticker} Dividends`
					}
				/>
				<SingleChart
					xdata={data.date}
					ydata={y2}
					type="percentage"
					title={
						active === 'trailing'
							? `${info.ticker} Dividend Growth (TTM YoY)`
							: `${info.ticker} Dividend Growth (YoY)`
					}
				/>
			</div>
		</>
	);
};

export default DividendChart;
