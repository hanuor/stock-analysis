import { Dispatch, SetStateAction } from 'react';

interface Props {
	chartTime: string;
	setChartTime: Dispatch<SetStateAction<string>>;
}

export const Controls = ({ chartTime, setChartTime }: Props) => {
	return (
		<ul className="tabs-small">
			<li>
				<button
					className={chartTime === '1D' ? 'active' : 'inactive'}
					onClick={() => setChartTime('1D')}
				>
					<span>1D</span>
					<span>1 Day</span>
				</button>
			</li>
			<li>
				<button
					className={chartTime === '5D' ? 'active' : 'inactive'}
					onClick={() => setChartTime('5D')}
				>
					<span>5D</span>
					<span>5 Days</span>
				</button>
			</li>
			<li>
				<button
					className={chartTime === '1M' ? 'active' : 'inactive'}
					onClick={() => setChartTime('1M')}
				>
					<span>1M</span>
					<span>1 Month</span>
				</button>
			</li>
			<li>
				<button
					className={chartTime === 'YTD' ? 'active' : 'inactive'}
					onClick={() => setChartTime('YTD')}
				>
					YTD
				</button>
			</li>
			<li>
				<button
					className={chartTime === '1Y' ? 'active' : 'inactive'}
					onClick={() => setChartTime('1Y')}
				>
					<span>1Y</span>
					<span>1 Year</span>
				</button>
			</li>
			<li>
				<button
					className={chartTime === '5Y' ? 'active' : 'inactive'}
					onClick={() => setChartTime('5Y')}
				>
					<span>5Y</span>
					<span>5 Years</span>
				</button>
			</li>
			<li>
				<button
					className={chartTime === 'MAX' ? 'active' : 'inactive'}
					onClick={() => setChartTime('MAX')}
				>
					Max
				</button>
			</li>
		</ul>
	);
};

export default Controls;
