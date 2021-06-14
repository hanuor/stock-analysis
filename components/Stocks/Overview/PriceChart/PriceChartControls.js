const Controls = ({ chartTime, setChartTime }) => {
	let common =
		' text-smaller py-1 px-0.5 xs:px-[3px] bp:px-1.5 sm:px-2 rounded-md focus:outline-none';
	let active = 'bp:bg-gray-100 text-gray-800 font-semibold' + common;
	let inactive =
		'text-gray-900 hover:text-gray-900 hover:text-shadow' + common;

	return (
		<ul className="flex space-x-0.5 whitespace-nowrap">
			<li>
				<button
					className={chartTime === '1D' ? active : inactive}
					onClick={() => setChartTime('1D')}>
					<span className="block sm:hidden lg:block xl:hidden">1D</span>
					<span className="hidden sm:block lg:hidden xl:block">1 Day</span>
				</button>
			</li>
			<li>
				<button
					className={chartTime === '5D' ? active : inactive}
					onClick={() => setChartTime('5D')}>
					<span className="block sm:hidden lg:block xl:hidden">5D</span>
					<span className="hidden sm:block lg:hidden xl:block">
						5 Days
					</span>
				</button>
			</li>
			<li>
				<button
					className={chartTime === '1M' ? active : inactive}
					onClick={() => setChartTime('1M')}>
					<span className="block sm:hidden lg:block xl:hidden">1M</span>
					<span className="hidden sm:block lg:hidden xl:block">
						1 Month
					</span>
				</button>
			</li>
			<li>
				<button
					className={chartTime === '6M' ? active : inactive}
					onClick={() => setChartTime('6M')}>
					<span className="block sm:hidden lg:block xl:hidden">6M</span>
					<span className="hidden sm:block lg:hidden xl:block">
						6 Months
					</span>
				</button>
			</li>
			<li>
				<button
					className={chartTime === 'YTD' ? active : inactive}
					onClick={() => setChartTime('YTD')}>
					YTD
				</button>
			</li>
			<li>
				<button
					className={chartTime === '1Y' ? active : inactive}
					onClick={() => setChartTime('1Y')}>
					<span className="block sm:hidden lg:block xl:hidden">1Y</span>
					<span className="hidden sm:block lg:hidden xl:block">
						1 Year
					</span>
				</button>
			</li>
			<li>
				<button
					className={chartTime === '5Y' ? active : inactive}
					onClick={() => setChartTime('5Y')}>
					<span className="block sm:hidden lg:block xl:hidden">5Y</span>
					<span className="hidden sm:block lg:hidden xl:block">
						5 Years
					</span>
				</button>
			</li>
			<li>
				<button
					className={chartTime === 'MAX' ? active : inactive}
					onClick={() => setChartTime('MAX')}>
					Max
				</button>
			</li>
		</ul>
	);
};

export default Controls;
